import Patient from "../models/patient.js";


// ADMIN - GET ALL PATIENTS
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "name email");

    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// PATIENT - GET PROFILE
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// PATIENT - UPDATE PROFILE
export const updatePatientProfile = async (req, res) => {
  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );

    res.json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Update Failed" });
  }
};


// ADMIN - DELETE PATIENT
export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};