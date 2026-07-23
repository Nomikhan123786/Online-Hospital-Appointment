import API from "./axiosInstance";


// Get All Doctors (for admin or patient view)
export const getDoctors = async () => {
  const response = await API.get("/admin/doctors");
  return response.data;
};

// Approve Doctor (Admin)
export const approveDoctor = async (id) => {
  const response = await API.put(
    `/admin/approve-doctor/${id}`
  );
  return response.data;
};

// Get All Patients (Admin)
export const getPatients = async () => {
  const response = await API.get("/admin/patients");
  return response.data;
};

// Get Admin Dashboard Stats
export const getAdminStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};