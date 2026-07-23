import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: String,
    experience: Number,
    fees: Number,
    hospitalName: String,
    schedule: [
      {
        day: String, // Monday, Tuesday
        startTime: String, // 09:00
        endTime: String, // 05:00
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);