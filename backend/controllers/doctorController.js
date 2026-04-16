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
//add schedual
export const addSchedule = async (req, res) => {
  try {
    const { date, startTime,endTime } = req.body;
    console.log("USER ID:", req.user.id);
    const doctor = await Doctor.findOne({ user: req.user.id });
    console.log("DOCTOR:", doctor);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Convert date → day
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Add new slot
    doctor.schedule.push({
      day,
      startTime: startTime,
      endTime: endTime, 
    });

    await doctor.save();

    res.status(201).json({ message: "Slot added successfully", schedule: doctor.schedule });

  } catch (error) {
    res.status(500).json({ message: "Add schedule error" });
  }
};
//get schedual
export const getSchedule = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor.schedule);

  } catch (error) {
    res.status(500).json({ message: "Fetch schedule error" });
  }
};
// DELETE schedule slot
export const deleteSchedule = async (req, res) => {
  try {
    const { index } = req.params;

    const doctor = await Doctor.findOne({ user: req.user.id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    if (!doctor.schedule[index]) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Remove slot by index
    doctor.schedule.splice(index, 1);

    await doctor.save();

    res.json({ message: "Slot deleted successfully", schedule: doctor.schedule });

  } catch (error) {
    res.status(500).json({ message: "Delete schedule error" });
  }
};