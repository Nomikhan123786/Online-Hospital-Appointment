import express from "express";
import { getDoctors } from "../controllers/doctorController.js";
import Doctor from "../models/Doctor.js";
import Appointment from "../models/Appointment.js";
import { addSchedule, getSchedule } from "../controllers/doctorController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { deleteSchedule } from "../controllers/doctorController.js";

import { doctorDashboard, doctorPatients} from "../controllers/doctorController.js";

const router = express.Router();

// GET ALL DOCTORS
router.get("/", getDoctors);


// Doctor Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  authorizeRoles("doctor"),
  doctorDashboard
);


// Doctor Schedule
router.get(
  "/schedule",
  authMiddleware,
  authorizeRoles("doctor"),
  getSchedule
);
// doctor schedual add
router.post(
  "/schedule",
  authMiddleware,
  authorizeRoles("doctor"),
  addSchedule
);
// DELETE SLOT
router.delete(
  "/schedule/:index",
  authMiddleware,
  authorizeRoles("doctor"),
  deleteSchedule
);


// Doctor Patients
router.get(
  "/patients",
  authMiddleware,
  authorizeRoles("doctor"),
  doctorPatients
);




// GET APPOINTMENTS
router.get("/appointments", authMiddleware, async (req, res) => {
  try {
     const doctor = await Doctor.findOne({ user: req.user._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const appointments = await Appointment.find({
      doctor: doctor._id
    })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.json(appointments);

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Error fetching appointments" });

  }
});


// GET DOCTOR BY ID 
router.get("/:id", async (req, res) => {
  try {

    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);

  } catch (error) {

    console.error("Doctor not fetch by id", error);

    res.status(500).json({ message: "Error fetching doctor" });

  }
});


export default router;