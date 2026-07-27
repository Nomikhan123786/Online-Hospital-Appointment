import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";
import DashboardLayout from "../../components/DashboardLayout";

const StatCard = ({ label, value, tone }) => (
  <div className="surface-card p-6">
    <p className="text-sm font-medium text-ink-400">{label}</p>
    <h3 className={`mt-2 text-3xl font-display font-bold ${tone}`}>{value}</h3>
  </div>
);

const statusStyle = (status) =>
  status === "approved"
    ? "bg-emerald-100 text-emerald-700"
    : status === "rejected"
    ? "bg-red-100 text-red-700"
    : "bg-amber-100 text-amber-700";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pending: 0,
    approved: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/doctors/appointments");

      setAppointments(res.data);

      const total = res.data.length;
      const pending = res.data.filter((a) => a.status === "pending").length;
      const approved = res.data.filter((a) => a.status === "approved").length;

      setStats({
        totalAppointments: total,
        pending,
        approved,
      });
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ SINGLE function only
  const handleUpdateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const handlePayment = async (id) => {
    try {
      await API.put(`/appointments/payment/${id}`);
      fetchAppointments();
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  return (
    <DashboardLayout title="Doctor Dashboard" subtitle="Manage your appointment requests">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard label="Total Requests" value={stats.totalAppointments} tone="text-brand-600" />
        <StatCard label="Pending" value={stats.pending} tone="text-amber-500" />
        <StatCard label="Approved" value={stats.approved} tone="text-emerald-600" />
      </div>

      {/* Appointment List */}
      <div className="surface-card p-6 sm:p-8">
        <h2 className="text-base sm:text-lg font-semibold text-ink-900 mb-6">
          Patient Appointment Requests
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-ink-50 animate-pulse" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-14">
            <div className="text-4xl mb-3">🗓️</div>
            <p className="text-ink-600 font-medium">No appointment requests yet</p>
            <p className="text-sm text-ink-400 mt-1">
              New patient requests will show up here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div
                key={app._id}
                className="border border-ink-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-brand-200 transition-colors"
              >
                {/* Left Side */}
                <div>
                  <p className="font-semibold text-ink-900">
                    {app.patient?.name || "Unknown Patient"}
                  </p>

                  <p className="text-ink-400 text-sm">
                    {new Date(app.date).toLocaleDateString()} • {app.time}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle(app.status)}`}>
                      {app.status}
                    </span>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        app.paymentStatus === "paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-ink-100 text-ink-600"
                      }`}
                    >
                      {app.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Right Side Buttons */}
                <div className="flex flex-wrap gap-3 shrink-0">
                  {app.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(app._id, "approved")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(app._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {app.paymentStatus === "pending" && (
                    <button
                      onClick={() => handlePayment(app._id)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Mark Paid
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
