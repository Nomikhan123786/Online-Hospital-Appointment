import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/dashboard");
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const data = [
    { name: "Users", value: stats.totalUsers },
    { name: "Doctors", value: stats.totalDoctors },
    { name: "Patients", value: stats.totalPatients },
    { name: "Appointments", value: stats.totalAppointments },
  ];

  return (
    <div className="animate-[fadeIn_0.6s_ease-in]">
      <h2>Admin Analytics</h2>

      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
};

export default AdminDashboard;