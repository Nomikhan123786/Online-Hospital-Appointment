const Complaint = require("../models/complaint");
const { getIO } = require("../socket");

exports.createComplaint = async (req, res) => {
  const complaint = await Complaint.create({
    student: req.user.id,
    department: req.body.department,
    gallery: req.body.gallery,
    classroom: req.body.classroom,
    issue: req.body.issue,
    file: req.file?.filename
  });

  getIO().emit("newComplaint", complaint);

  res.json(complaint);
};

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find().populate("student", "name email");
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  complaint.status = req.body.status;
  await complaint.save();

  getIO().emit("statusUpdated", complaint);

  res.json(complaint);
};