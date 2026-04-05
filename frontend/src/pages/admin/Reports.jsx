import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("token");

 
   
 useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/admin/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };
   fetchStats();
  }, [token]);

  if (!stats) return <p style={{ padding: "30px" }}>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>System Reports</h2>

      <div className="card">
        <h3>Total Users: {stats.totalUsers}</h3>
      </div>

      <div className="card">
        <h3>Total Doctors: {stats.totalDoctors}</h3>
      </div>

      <div className="card">
        <h3>Total Patients: {stats.totalPatients}</h3>
      </div>

      <div className="card">
        <h3>Total Appointments: {stats.totalAppointments}</h3>
      </div>
    </div>
  );
};

export default Reports;