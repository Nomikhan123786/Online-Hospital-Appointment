
import { useEffect, useState, useContext } from "react";
import API from "../../services/axiosInstance";

import { AuthContext } from "../../context/AuthContext";

const MyAppointments = () => {

  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

   

  }, [user]);


  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const res = await API.get("/appointments/my");
        setAppointments(res.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchAppointments();

  }, []);



  const cancelAppointment = async (id) => {

    try {

      await API.delete(`/appointments/${id}`);
       fetchAppointments();
      setAppointments((prev) =>
        prev.filter((app) => app._id !== id)
      );

    } catch (error) {
      console.log(error);
    }

  };



  const getStatusColor = (status) => {

    if (status === "approved") return "bg-green-100 text-green-700";
    if (status === "rejected") return "bg-red-100 text-red-700";

    return "bg-yellow-100 text-yellow-700";

  };



  const getPaymentColor = (paymentStatus) => {

    if (paymentStatus === "paid") return "bg-green-100 text-green-700";

    return "bg-gray-200 text-gray-700";

  };



  const getCountdown = (date) => {

    const appointmentDate = new Date(date);
    const now = new Date();

    const diff = appointmentDate - now;

    if (diff <= 0) return "Appointment Completed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return `${days} day(s) remaining`;

  };



  return (

    <div className="min-h-screen bg-gray-100 py-10 px-6 animate-[fadeIn_0.6s_ease-in]">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
          My Appointments
        </h2>


        {appointments.length === 0 && (

          <div className="bg-white p-10 rounded-xl shadow text-center">

            <p className="text-gray-500 text-lg">
              No appointments found
            </p>

          </div>

        )}



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {appointments.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >

              {/* Doctor Profile */}

              <div className="flex items-center gap-4 mb-4">

                <img
                  src={
                    app.doctor?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                  }
                  alt="doctor"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <h3 className="text-lg font-semibold text-gray-800">
                     {app.doctor?.user?.name || "Doctor"}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {app.doctor?.specialization || "Specilization"}
                  </p>

                </div>

              </div>



              {/* Appointment Info */}

              <p className="text-gray-600 mb-1">
                📅 <span className="font-medium">Date:</span> {app.date}
              </p>

              <p className="text-gray-600 mb-1">
                ⏰ <span className="font-medium">Time:</span> {app.time}
              </p>



              {/* Countdown */}

              <p className="text-blue-600 text-sm mb-3">
                ⏳ {getCountdown(app.date)}
              </p>



              {/* Status */}

              <div className="flex gap-2 mb-3">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    app.status
                  )}`}
                >
                  {app.status}
                </span>



                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                    app.paymentStatus
                  )}`}
                >
                  {app.paymentStatus}
                </span>

              </div>



              {/* Cancel Button */}

             {app.status !== "cancelled" && (
                <button
                  onClick={() => cancelAppointment(app._id)}
                     className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                          >
                     Cancel Appointment
                </button>
              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default MyAppointments;
