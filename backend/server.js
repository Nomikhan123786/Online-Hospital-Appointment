import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dns from "dns";

// Routes
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Utils
import autoExpireAppointments from "./utils/autoExpireAppointments.js";

// Models (if needed elsewhere)
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// DNS fix (optional for MongoDB network issues)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Error:");
    console.log(err.message);
  });

// App init
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// Debug env
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Auto expire jobs
autoExpireAppointments();