const express = require("express");
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const Complaint = require("../models/complaint");

module.exports = (io) => {
  const router = express.Router();

  const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });

  const upload = multer({ storage });

  router.post("/", protect, upload.single("file"), async (req, res) => {
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

  router.get("/", protect, async (req, res) => {
    const complaints = await Complaint.find().populate("student", "name email");
    res.json(complaints);
  });

  router.put("/:id", protect, async (req, res) => {
    const complaint = await Complaint.findById(req.params.id);
    complaint.status = req.body.status;
    await complaint.save();

    io.emit("statusUpdated", complaint);
    res.json(complaint);
  });

  return router;
};