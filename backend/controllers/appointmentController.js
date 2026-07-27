import Appointment from "../models/Appointment.js";
import sendEmail from "../utils/sendEmail.js";

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

    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate({
        path: "doctor",
        select: "specialization user",
        populate: { path: "user", select: "name" },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = req.body.status;
    await appointment.save();

    // Emit real-time update to patient
    io.to(appointment.patient._id.toString()).emit("appointmentUpdated", {
      message: "Your appointment status updated",
      status: appointment.status,
    });

    // Send email to patient when doctor accepts or rejects the appointment
    if (appointment.patient?.email) {
      const doctorName = appointment.doctor?.user?.name || "your doctor";

      if (appointment.status === "approved") {
        sendEmail(
          appointment.patient.email,
          "Appointment Accepted",
          `Hi ${appointment.patient.name}, your appointment with Dr. ${doctorName} on ${appointment.date} at ${appointment.time} has been accepted.`
        ).catch((err) =>
          console.log("Email sending failed (appointment accepted):", err.message)
        );
      } else if (appointment.status === "rejected") {
        sendEmail(
          appointment.patient.email,
          "Appointment Rejected",
          `Hi ${appointment.patient.name}, unfortunately your appointment with Dr. ${doctorName} on ${appointment.date} at ${appointment.time} has been rejected. Please book another slot.`
        ).catch((err) =>
          console.log("Email sending failed (appointment rejected):", err.message)
        );
      }
    }

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
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate({
        path: "doctor",
        select: "specialization user",
        populate: { path: "user", select: "name" },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.paymentStatus = "paid";

    await appointment.save();

    // Send email to patient confirming payment received
    if (appointment.patient?.email) {
      const doctorName = appointment.doctor?.user?.name || "your doctor";

      sendEmail(
        appointment.patient.email,
        "Payment Received",
        `Hi ${appointment.patient.name}, we have received your payment for the appointment with Dr. ${doctorName} on ${appointment.date} at ${appointment.time}.`
      ).catch((err) =>
        console.log("Email sending failed (payment received):", err.message)
      );
    }

    res.json({ message: "Payment marked as paid" });

  } catch (error) {
    res.status(500).json({ message: "Payment update failed" });
  }
};