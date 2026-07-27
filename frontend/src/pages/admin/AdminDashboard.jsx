import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";
import DashboardLayout from "../../components/DashboardLayout";
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

const COLORS = [
  "var(--color-brand-500)",
  "var(--color-accent-500)",
  "var(--color-brand-300)",
  "#f59e0b",
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/admin/dashboard");
      setStats(data);
    };
    fetchStats();
  }, []);

  const cards = stats
    ? [
        { name: "Total Users", value: stats.totalUsers, icon: "👥" },
        { name: "Doctors", value: stats.totalDoctors, icon: "🩺" },
        { name: "Patients", value: stats.totalPatients, icon: "🧑‍🤝‍🧑" },
        { name: "Appointments", value: stats.totalAppointments, icon: "🗓️" },
      ]
    : [];

  const chartData = cards.map((c) => ({
    name: c.name.replace("Total ", ""),
    value: c.value,
  }));

  return (
    <DashboardLayout title="Admin Overview" subtitle="Platform-wide activity at a glance">
      {!stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="surface-card p-6 h-28 animate-pulse bg-ink-50" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((c) => (
              <div key={c.name} className="surface-card p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-ink-400">{c.name}</p>
                    <p className="mt-2 text-3xl font-display font-bold text-ink-900">
                      {c.value}
                    </p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-xl">
                    {c.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="surface-card p-6 sm:p-8">
            <h2 className="text-base sm:text-lg font-semibold text-ink-900 mb-6">
              Platform Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-ink-100)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--color-ink-600)", fontSize: 13, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--color-ink-400)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-brand-50)" }}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid var(--color-ink-100)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    fontSize: 13,
                  }}
                  labelStyle={{ fontWeight: 600, color: "var(--color-ink-900)" }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]} maxBarSize={70} animationDuration={800}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
