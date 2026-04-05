import express from "express";
import {
  getAllPatients,
  getPatientProfile,
  updatePatientProfile,
  deletePatient
} from "../controllers/patientController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


// ADMIN - GET ALL PATIENTS
router.get("/", authMiddleware, authorizeRoles("admin"), getAllPatients);


// PATIENT - GET OWN PROFILE
router.get("/profile", authMiddleware, authorizeRoles("patient"), getPatientProfile);


// PATIENT - UPDATE PROFILE
router.put("/profile", authMiddleware, authorizeRoles("patient"), updatePatientProfile);


// ADMIN - DELETE PATIENT
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deletePatient);


export default router;