import express from "express";
import Appointment from "../models/Appointment.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { cancelAppointment } from "../controllers/appointmentController.js";
import {
  createAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
const router = express.Router();

// Book appointment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: req.body.doctorId,
      date: req.body.date,
      time: req.body.time,
      status: "pending",
    });

    res.status(201).json(appointment);
  } catch (error) {
    console.log("BOOKING ERROR:", error); 
    res.status(500).json({ message: "Booking Failed" });
  }
});
//cancel Appointments

router.delete("/:id", authMiddleware, cancelAppointment);
// Get my appointments
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      $or: [{ patient: req.user._id }, { doctor: req.user._id }],
    })
      .populate({
      path: "doctor",
      populate: {
        path: "user",
        select: "name email"
      }
    }); 
    

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

//put appointments

router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = req.body.status;

    await appointment.save();

    res.json({ message: "Status updated successfully" });

  } catch (error) {

    res.status(500).json({ message: "Update failed" });

  }

});
router.post("/", authMiddleware, createAppointment);
router.put("/:id", authMiddleware, updateAppointmentStatus);

export default router;