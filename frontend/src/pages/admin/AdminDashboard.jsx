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

const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b"];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/dashboard");
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
      </div>
    );
  }

  const cards = [
    {
      name: "Total Users",
      value: stats.totalUsers,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      name: "Doctors",
      value: stats.totalDoctors,
      color: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      name: "Patients",
      value: stats.totalPatients,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      name: "Appointments",
      value: stats.totalAppointments,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ];

  const data = cards.map((c) => ({
    name: c.name.replace("Total ", ""),
    value: c.value,
  }));

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 animate-[fadeIn_0.6s_ease-in]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
            Admin Analytics
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Overview of platform activity
          </p>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.name}
              className={`rounded-2xl border p-5 shadow-sm ${c.color}`}
            >
              <p className="text-sm font-medium opacity-80">{c.name}</p>
              <p className="mt-2 text-3xl font-bold">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-center text-lg font-semibold text-slate-700">
            Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={420}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                {COLORS.map((color, i) => (
                  <linearGradient
                    key={i}
                    id={`gradient-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip
                cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  fontSize: 13,
                }}
                labelStyle={{ fontWeight: 600, color: "#1e293b" }}
              />
              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                maxBarSize={70}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={`url(#gradient-${i})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
