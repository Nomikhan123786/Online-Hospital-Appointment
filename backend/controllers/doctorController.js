import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";

export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
    });

    const doctor = await Doctor.create({
      user: user._id,
      specialization,
    });

    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Doctor Dashboard
export const doctorDashboard = async (req, res) => {
  try {
       const doctor = await Doctor.findOne({ user: req.user.id });
    

    const totalAppointments = await Appointment.countDocuments({
      doctor:doctor._id,
    });

    const todayAppointments = await Appointment.countDocuments({
      doctor:doctor._id,
      date: new Date().toISOString().split("T")[0],
    });

    const totalPatients = await Appointment.distinct("patient", {
      doctor:doctor._id,
    });
    const patients = await Appointment.distinct("patient", {
      doctor: doctor._id,
    });

    res.json({
      totalAppointments,
      todayAppointments,
      totalPatients: totalPatients.length,
    });

  } catch (error) {
    res.status(500).json({ message: "Doctor dashboard error" });
  }
};

// Doctor Schedule
export const doctorSchedule = async (req, res) => {

  try {

   const doctor = await Doctor.findOne({ user: req.user.id });

    const appointments = await Appointment.find({ 
      doctor:doctor._id
     })
      .populate("patient", "name email")
      .sort({ date: 1 });

    res.json(appointments);

  } catch (error) {

    res.status(500).json({ message: "Schedule error" });

  }

};

// Doctor Patient List
export const doctorPatients = async (req, res) => {

  try {
      const doctor = await Doctor.findOne({ user: req.user.id });
  

    const appointments = await Appointment.find({ 
      doctor:doctor._id,
    })
      .populate("patient", "name email");

    const patients = appointments.map((a) => a.patient);

    res.json(patients);

  } catch (error) {

    res.status(500).json({ message: "Patients fetch error" });

  }

};