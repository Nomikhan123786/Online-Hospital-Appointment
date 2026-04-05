
import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

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

    if (status === "approved")
      return "bg-green-100 text-green-700";

    if (status === "rejected")
      return "bg-red-100 text-red-700";

    if (status === "cancelled")
      return "bg-gray-200 text-gray-700";

    return "bg-yellow-100 text-yellow-700";
  };


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Dashboard Title */}

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Patient Dashboard
        </h2>


        {/* Stats Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {appointments.length}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Upcoming</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {
                appointments.filter(a => a.status === "approved").length
              }
            </h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-sm">Pending</p>
            <h3 className="text-3xl font-bold text-yellow-600 mt-2">
              {
                appointments.filter(a => a.status === "pending").length
              }
            </h3>
          </div>

        </div>


        {/* Recent Appointments Table */}

        <div className="bg-white rounded-xl shadow">

          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-700">
              Recent Appointments
            </h3>
          </div>

          {loading ? (

            <div className="p-6 text-gray-500">
              Loading appointments...
            </div>

          ) : appointments.length === 0 ? (

            <div className="p-6 text-gray-500">
              No appointments found
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="bg-gray-50">

                  <tr className="text-gray-600 text-sm">

                    <th className="p-4">Date</th>
                    <th className="p-4">Time</th>
                    <th className="p-4">Doctor</th>
                    <th className="p-4">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {appointments.map((appt) => (

                    <tr
                      key={appt._id}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4">
                        {new Date(appt.date).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {appt.time}
                      </td>

                      <td className="p-4 font-medium text-gray-700">
                        {appt?.doctor?.user?.name || "Doctor"}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusStyle(
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

      </div>

    </div>

  );

};

export default PatientDashboard;
