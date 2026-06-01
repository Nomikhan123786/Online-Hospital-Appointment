import Appointment from "../models/Appointment.js";
import { getLeastBusyDoctor, isTimeSlotAvailable } from "../utils/smartScheduler.js";
import { getCache, setCache } from "../utils/cache.js";
import sendEmail from "../utils/sendEmail.js";
import Doctor from "../models/Doctor.js";


export const emergencyAppointment = async (req, res) => {
  try {

    const { doctorId } = req.body;

   const appointment = await Appointment.create({
  doctor: doctorId,
  patient: req.user._id,
  isEmergency: true,
  priority: "emergency",
  date: new Date().toISOString().split("T")[0],
  time: "Emergency",
  status: "pending"
});

    console.log("🚨 Emergency alert sent");

    res.status(201).json({
      success: true,
      message: "Emergency request sent",
      appointment
    });

  } catch (error) {

    console.log("Emergency Controller Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getDoctors = async (req, res) => {
  const cached = getCache("doctors");

  if (cached) return res.json(cached);

  const doctors = await Doctor.find();

  setCache("doctors", doctors);

  res.json(doctors);
};
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

//book appointments
export const bookAppointment = async (req, res) => {
  const { time } = req.body;

  const doctors = await Doctor.find();
  const appointments = await Appointment.find();

  const doctorId = getLeastBusyDoctor(doctors, appointments);

  if (!isTimeSlotAvailable(appointments, doctorId, time)) {
    return res.status(400).json({ msg: "Time slot not available" });
  }

  const newAppointment = new Appointment({
    doctorId,
    time,
    patientId: req.user.id
  });

  await newAppointment.save();

  res.json(newAppointment);
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


//Appoved or reject
export const updateAppointmentStatus = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id)
      .populate({
       path: "patient",
       select: "name email"
      })
      .populate({
        path: "doctor",
        populate: {
          path: "user"
        }
      });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Update status
    appointment.status = req.body.status;

    await appointment.save();

    //  SEND EMAIL
    if (appointment.patient?.email) {
    await sendEmail(
      appointment.patient.email,
      "Appointment Status Updated",
      `
Hello ${appointment.patient.name},

Your appointment with Dr. ${appointment.doctor?.user?.name} has been ${appointment.status.toUpperCase()}.

Date: ${appointment.date}
Time: ${appointment.time}

Thank you for using our hospital system.
      `
    );
    console.log("Appointment email sent")
  }else {

    console.log("Patient email not found");

  }

    res.json({
      message: "Appointment updated & email sent"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};
//payment approved or rejected
export const updatePaymentStatus = async (req, res) => {
  try {

    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: "patient",
        select: "name email"
      });

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    // Update payment
    appointment.paymentStatus = "paid";

    await appointment.save();

    console.log("PATIENT:", appointment.patient);

    //  Send Email
    if (appointment.patient?.email) {

      await sendEmail(
        appointment.patient.email,
        "Payment Successful",
        `
        Hello ${appointment.patient?.name},

        Your payment has been marked as PAID 

       Appointment Date: ${appointment.date}
       Appointment Time: ${appointment.time}

       Thank you for using our hospital system.
        `
      );

      console.log(" Payment email sent");

    } else {

      console.log("Patient email not found");

    }

    res.json({
      success: true,
      message: "Payment updated successfully"
    });

  } catch (error) {

    console.log("PAYMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

