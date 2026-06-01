import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isEmergency: {
     type: Boolean,
     default: false
     },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    date: String,
    time: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed","cancelled","expired"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "jazzcash", "easypaisa"],
      default: "cash"
      },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", ],
      default: "pending",
    },
  
  
  date: String,
  time: String,

  status: {
    type: String,
    default: "pending",
  },
    priority: {
     type: String,
     enum: ["normal", "emergency"],
     default: "normal"
    }
    
    

  },
  
  { timestamps: true }
  
);

export default mongoose.model("Appointment", appointmentSchema);