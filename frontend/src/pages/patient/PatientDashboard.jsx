import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/axiosInstance";
import DashboardLayout from "../../components/DashboardLayout";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    if (status === "approved") return "bg-emerald-100 text-emerald-700";
    if (status === "rejected") return "bg-red-100 text-red-700";
    if (status === "cancelled") return "bg-ink-100 text-ink-600";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <DashboardLayout title="Patient Dashboard" subtitle="Your appointments at a glance">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <div className="surface-card p-6">
          <p className="text-ink-400 text-sm font-medium">Total Appointments</p>
          <h3 className="text-3xl font-display font-bold text-brand-600 mt-2">
            {appointments.length}
          </h3>
        </div>

        <div className="surface-card p-6">
          <p className="text-ink-400 text-sm font-medium">Upcoming</p>
          <h3 className="text-3xl font-display font-bold text-emerald-600 mt-2">
            {appointments.filter((a) => a.status === "approved").length}
          </h3>
        </div>

        <div className="surface-card p-6">
          <p className="text-ink-400 text-sm font-medium">Pending</p>
          <h3 className="text-3xl font-display font-bold text-amber-500 mt-2">
            {appointments.filter((a) => a.status === "pending").length}
          </h3>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="surface-card overflow-hidden">
        <div className="p-6 border-b border-ink-100 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-ink-900">
            Recent Appointments
          </h3>
          <Link to="/doctors" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            Book new →
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-ink-50 animate-pulse" />
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-14 px-6">
            <div className="text-4xl mb-3">🩺</div>
            <p className="text-ink-600 font-medium">No appointments yet</p>
            <p className="text-sm text-ink-400 mt-1 mb-5">
              Book your first appointment with a trusted doctor.
            </p>
            <Link to="/doctors" className="btn-primary text-sm inline-flex">
              Find a Doctor
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead style={{ background: "var(--color-ink-50)" }}>
                <tr className="text-ink-600 text-sm">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Time</th>
                  <th className="p-4 font-medium">Doctor</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr
                    key={appt._id}
                    className="border-t border-ink-100 hover:bg-ink-50/60 transition-colors"
                  >
                    <td className="p-4 text-sm text-ink-800">
                      {new Date(appt.date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-ink-800">{appt.time}</td>
                    <td className="p-4 text-sm font-medium text-ink-900">
                      {appt?.doctor?.user?.name || "Doctor"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(
                          appt.status
                        )}`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
