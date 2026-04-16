import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {

  try {

    const { doctorId, date, time, paymentMethod } = req.body;

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user._id,
      date,
      time,
      paymentMethod
    });

    res.json(appointment);

  } catch (error) {

    res.status(500).json({ message: "Booking failed" });

  }

};

export const cancelAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only patient can cancel their appointment
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment cancelled successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cancel failed" });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: req.body.doctor,
      date: req.body.date,
      time: req.body.time,
    });

    res.status(201).json(appointment);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {

    const io = req.app.get("io");   // ✅ moved here

    const appointment = await Appointment.findById(req.params.id);

    appointment.status = req.body.status;
    await appointment.save();

   

    // Emit real-time update to patient
    io.to(appointment.patient.toString()).emit("appointmentUpdated", {
      message: "Your appointment status updated",
      status: appointment.status,
    });

    res.json({ message: "Appointment updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
    }).populate("doctor");

    res.json(appointments);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
//payment approved 
export const updatePaymentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.paymentStatus = "paid";

    await appointment.save();

    res.json({ message: "Payment marked as paid" });

  } catch (error) {
    res.status(500).json({ message: "Payment update failed" });
  }
};