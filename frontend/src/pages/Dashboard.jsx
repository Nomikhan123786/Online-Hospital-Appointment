import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";
import AdminDashboard from "./admin/AdminDashboard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (user.role === "patient") return <PatientDashboard />;
  if (user.role === "doctor") return <DoctorDashboard />;
  if (user.role === "admin") return <AdminDashboard />;

  return null;
};

export default Dashboard;