import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";

import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js"
import patientRoutes from "./routes/patientRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


import User from "./models/User.js";
import bcrypt from "bcryptjs";

import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);




mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");

    // AUTO CREATE ADMIN IF NOT EXISTS
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("noman890", 10);

      await User.create({
        name: "Noman Nawaz Khan",
        email: "nomank7887682@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("Admin created successfully");
      console.log("Email: admin@gmail.com");
      console.log("Password: jdvjkxvx");
    } else {
      console.log("Admin already exists");
    }
  })
  .catch((err) => {
    console.log("MongoDB Error:");
    console.log(err.message);
  });


const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*" },
});

app.set("io", io);


app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors",doctorRoutes)
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);


  // SOCKET CONNECTION

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinUserRoom", (userId) => {
    socket.join(userId);
  });
});
console.log(process.env.STRIPE_SECRET_KEY);

  // SERVER START

server.listen(5000, () =>
  console.log("Server running on port 5000")
);