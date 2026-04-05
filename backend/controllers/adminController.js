import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

export const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDoctors = await User.countDocuments({ role: "doctor" });
  const totalPatients = await User.countDocuments({ role: "patient" });
  const totalAppointments = await Appointment.countDocuments();

  const completedAppointments = await Appointment.countDocuments({
    status: "completed",
  });

  res.json({
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    completedAppointments,
  });
};