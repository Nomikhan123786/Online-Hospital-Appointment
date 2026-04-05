import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/patient", authMiddleware, authorizeRoles("patient"), (req, res) => {
  res.json({ message: "Patient Dashboard Access" });
});

router.get("/doctor", authMiddleware, authorizeRoles("doctor"), (req, res) => {
  res.json({ message: "Doctor Dashboard Access" });
});

router.get("/admin", authMiddleware, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard Access" });
});

export default router;