import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: String,
  gallery: String,
  classroom: String,
  issue: String,
  file: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);
