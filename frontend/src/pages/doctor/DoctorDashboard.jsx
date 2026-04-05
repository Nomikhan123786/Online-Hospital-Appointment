
import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pending: 0,
    approved: 0
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await API.get("/doctors/schedule");

      setAppointments(res.data);

      const total = res.data.length;
      const pending = res.data.filter(a => a.status === "pending").length;
      const approved = res.data.filter(a => a.status === "approved").length;

      setStats({
        totalAppointments: total,
        pending,
        approved
      });
      

    } catch (error) {

      console.log(error);

    }

  };



  const updateStatus = async (id, status) => {

    try {

      await API.put(`/appointments/${id}`, { status });

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };
  const updateStatuscah = async (id, status) => {

    try {

      await API.put(`/appointments/${id}`, { status });

      fetchAppointments();

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Doctor Dashboard
      </h1>


      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Total Requests</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {stats.totalAppointments}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Pending</p>
          <h3 className="text-3xl font-bold text-yellow-600">
            {stats.pending}
          </h3>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-gray-500">Approved</p>
          <h3 className="text-3xl font-bold text-green-600">
            {stats.approved}
          </h3>
        </div>

      </div>


      {/* Appointment Requests */}

      <div className="bg-white shadow-xl rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Patient Appointment Requests
        </h2>

        {appointments.length === 0 ? (

          <p className="text-gray-500">
            No appointment requests
          </p>

        ) : (

          <div className="space-y-4">

            {appointments.map((app) => (

              <div
                key={app._id}
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
              >

                <div>

                  <p className="font-semibold">
                    {app.patient?.name}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {new Date(app.date).toLocaleDateString()} • {app.time}
                  </p>

                  <span className={`text-xs px-3 py-1 rounded-full mt-2 inline-block
                    ${app.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>

                </div>


                {app.status === "pending" && (

                  <div className="space-x-3">

                    <button
                      onClick={() => updateStatus(app._id, "approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default DoctorDashboard;
