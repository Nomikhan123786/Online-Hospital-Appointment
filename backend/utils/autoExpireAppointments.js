import cron from "node-cron";
import Appointment from "../models/Appointment.js";

const autoExpireAppointments = () => {

  // Every minute
  cron.schedule("* * * * *", async () => {

    try {

      console.log("Checking expired appointments...");

      const now = new Date();

      const appointments = await Appointment.find({
        status: {
          $in: ["pending", "approved"]
        }
      });

      for (const appointment of appointments) {

        // Example:
        // "09:00 - 14:00"
        const timeRange = appointment.time;

        // Take only start time
        const startTime = timeRange.split("-")[0].trim();

        // Combine date + start time
        const appointmentDateTime = new Date(
          `${appointment.date} ${startTime}`
        );

        console.log(
          "Checking:",
          appointmentDateTime
        );

        // Expire appointment
        if (appointmentDateTime < now) {

          appointment.status = "expired";

          await appointment.save();

          console.log(
            `Expired: ${appointment._id}`
          );

        }

      }

    } catch (error) {

      console.log(
        "AUTO EXPIRE ERROR:",
        error
      );

    }

  });

};

export default autoExpireAppointments;