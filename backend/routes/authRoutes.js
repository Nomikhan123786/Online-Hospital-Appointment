import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.post("/create-admin", async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      return res.status(403).json({
        msg: "Admin already exists",
      });
    }

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword, // ✅ fixed
      role: "admin",
    });

    await admin.save();

    res.json({ msg: "Admin created successfully" });

  } catch (error) {
    console.log("ERROR:", error.message); 
    res.status(500).json({ msg: "Server error" });
  }
});
export default router;