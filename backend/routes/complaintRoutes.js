import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Complaint from "../models/complaint.js";

export default (io) => {
  const router = express.Router();

  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  const upload = multer({ storage });

  router.post("/", authMiddleware, upload.single("file"), async (req, res) => {
    const complaint = await Complaint.create({
      student: req.user._id,
      department: req.body.department,
      gallery: req.body.gallery,
      classroom: req.body.classroom,
      issue: req.body.issue,
      file: req.file?.filename
    });

    io.emit("newComplaint", complaint);
    res.json(complaint);
  });

  router.get("/", authMiddleware, async (req, res) => {
    const complaints = await Complaint.find().populate("student", "name email");
    res.json(complaints);
  });

  router.put("/:id", authMiddleware, async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    complaint.status = req.body.status;
    await complaint.save();

    io.emit("statusUpdated", complaint);
    res.json(complaint);
  });

  return router;
};
