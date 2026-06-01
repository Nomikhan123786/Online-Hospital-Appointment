import express from "express";

import Appointment from "../models/Appointment.js";

import {
  createAppointment,
  cancelAppointment,
  updateAppointmentStatus,
  updatePaymentStatus,
  emergencyAppointment,
  
} from "../controllers/appointmentController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Appointment
router.post(
  "/",
  authMiddleware,
  createAppointment
);



// Emergency Appointment


router.post(
  "/emergency",
  authMiddleware,
  emergencyAppointment
);



// Get My Appointments


router.get(
  "/my",
  authMiddleware,
  async (req, res) => {
    try {

      const appointments = await Appointment.find({
        $or: [
          { patient: req.user._id },
          { doctor: req.user._id },
        ],
      }).populate({
        path: "doctor",
        select: "specialization user",
        populate: {
          path: "user",
          select: "name email",
        },
      });

      res.json(appointments);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Error fetching appointments",
      });

    }
  }
);




// IMPORTANT:
// Specific route FIRST





// Patient Cancel Appointment


router.delete(
  "/:id",
  authMiddleware,
  cancelAppointment
);


// Update Appointment Status


router.put(
  "/:id",
  authMiddleware,
  updateAppointmentStatus
);



// Update Payment Status


router.put(
  "/payment/:id",
  authMiddleware,
  updatePaymentStatus
);


export default router;