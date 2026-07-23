import API from "./axiosInstance";


// Book Appointment
export const bookAppointment = async (data) => {
  const response = await API.post("/appointments", data);
  return response.data;
};

// Get My Appointments
export const getMyAppointments = async () => {
  const response = await API.get("/appointments/my");
  return response.data;
};

// Update Appointment Status (Doctor/Admin)
export const updateAppointmentStatus = async (id, status) => {
  const response = await API.put(
    `/appointments/${id}/status`,
    { status }
  );
  return response.data;
};