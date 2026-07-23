import express from "express";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { authMiddleware} from "../middleware/authMiddleware.js";
import {authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  addDoctor,
  getDoctors,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// ADD DOCTOR
router.post("/doctors", authMiddleware, authorizeRoles("admin"), addDoctor);

// GET ALL DOCTORS
router.get("/doctors", authMiddleware, getDoctors);

// DELETE DOCTOR
router.delete(
  "/doctors/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteDoctor
);
router.get("/dashboard", authMiddleware, authorizeRoles("admin"), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalAppointments = await Appointment.countDocuments();

    res.json({
      totalUsers,
      totalDoctors,
      totalPatients,
      totalAppointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Admin Dashboard Error" });
  }
});

export default router;