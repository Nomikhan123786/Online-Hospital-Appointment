import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState([]);

  const [stats, setStats] = useState({
    totalAppointments: 0,
    pending: 0,
    approved: 0,
    completed: 0,
    expired: 0,
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await API.get("/doctors/appointments");

      setAppointments(res.data);

      const total = res.data.length;

      const pending = res.data.filter(
        (a) => a.status === "pending"
      ).length;

      const approved = res.data.filter(
        (a) => a.status === "approved"
      ).length;

      const completed = res.data.filter(
        (a) => a.status === "completed"
      ).length;

      const expired = res.data.filter(
        (a) => a.status === "expired"
      ).length;

      setStats({
        totalAppointments: total,
        pending,
        approved,
        completed,
        expired,
      });

    } catch (error) {

      console.log("Fetch Error:", error);

    }

  };

  // Update Status
  const handleUpdateStatus = async (id, status) => {

    try {

      await API.put(`/appointments/${id}`, {
        status,
      });

      fetchAppointments();

    } catch (error) {

      console.log("Update Error:", error);

    }

  };

  // Payment
  const handlePayment = async (id) => {

    try {

      await API.put(`/appointments/payment/${id}`);

      fetchAppointments();

    } catch (error) {

      console.log("Payment Error:", error);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Doctor Dashboard
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <p className="text-gray-500">
            Total
          </p>

          <h3 className="text-3xl font-bold text-blue-600">
            {stats.totalAppointments}
          </h3>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <p className="text-gray-500">
            Pending
          </p>

          <h3 className="text-3xl font-bold text-yellow-500">
            {stats.pending}
          </h3>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <p className="text-gray-500">
            Approved
          </p>

          <h3 className="text-3xl font-bold text-green-600">
            {stats.approved}
          </h3>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <p className="text-gray-500">
            Completed
          </p>

          <h3 className="text-3xl font-bold text-indigo-600">
            {stats.completed}
          </h3>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          <p className="text-gray-500">
            Expired
          </p>

          <h3 className="text-3xl font-bold text-gray-600">
            {stats.expired}
          </h3>
        </div>

      </div>

      {/* Appointment List */}
      <div className="bg-white shadow-xl rounded-2xl p-6 border">

        <h2 className="text-xl font-semibold text-gray-700 mb-6">
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
                className="border rounded-xl p-4 flex justify-between items-center hover:bg-gray-50 transition"
              >

                {/* Left */}
                <div>

                  <p className="font-semibold text-gray-800">
                    {app.patient?.name || "Unknown Patient"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {new Date(app.date).toLocaleDateString()} • {app.time}
                  </p>

                  {/* Status */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full mt-2 inline-block

                    ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-700"

                        : app.status === "completed"
                        ? "bg-indigo-100 text-indigo-700"

                        : app.status === "cancelled"
                        ? "bg-red-100 text-red-700"

                        : app.status === "expired"
                        ? "bg-gray-200 text-gray-700"

                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>

                  {/* Payment */}
                  <span
                    className={`text-xs px-3 py-1 rounded-full ml-2

                    ${
                      app.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>

                </div>

                {/* Buttons */}
                <div className="flex gap-3 flex-wrap">

                  {app.status === "pending" && (

                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            app._id,
                            "approved"
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleUpdateStatus(
                            app._id,
                            "cancelled"
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                      >
                        Cancel
                      </button>
                    </>

                  )}

                  {app.status === "approved" && (

                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          app._id,
                          "completed"
                        )
                      }
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Complete
                    </button>

                  )}

                  {app.paymentStatus === "pending" && (

                    <button
                      onClick={() =>
                        handlePayment(app._id)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
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

    </div>

  );

};

export default DoctorDashboard;