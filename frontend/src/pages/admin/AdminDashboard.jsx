import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
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

  if (!stats)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );

  const data = [
    { name: "Users", value: stats.totalUsers },
    { name: "Doctors", value: stats.totalDoctors },
    { name: "Patients", value: stats.totalPatients },
    { name: "Appointments", value: stats.totalAppointments },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen animate-fadeIn">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 className="text-gray-500 text-sm">{item.name}</h3>
            <p className="text-2xl font-bold text-primary mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-6 text-gray-700">
    System Analytics
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={data}>
      
      {/* Gradient */}
      <defs>
        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
          <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7}/>
        </linearGradient>
      </defs>

      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

      <XAxis 
        dataKey="name" 
        stroke="#94a3b8"
        tick={{ fontSize: 12 }}
      />

      <YAxis 
        stroke="#94a3b8"
        tick={{ fontSize: 12 }}
      />

      <Tooltip
        cursor={{ fill: "rgba(99,102,241,0.1)" }}
        contentStyle={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      />

      <Bar
        dataKey="value"
        fill="url(#colorGradient)"
        radius={[12, 12, 0, 0]}
        barSize={45}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
    </div>
  );
};

export default AdminDashboard;