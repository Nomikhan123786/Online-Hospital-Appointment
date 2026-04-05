
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/axiosInstance";

const BookAppointment = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleBooking = async () => {

    try {

      const { data } = await API.post("/appointments", {
        doctorId: id,
        date,
        time,
        paymentMethod
      });

      alert("Appointment Booked Successfully");

      navigate("/appointments");

    } catch (error) {

      console.log(error.response?.data);
      alert("Booking Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 transition hover:shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Book Appointment
        </h2>

        {/* Date */}

        <div className="mb-4">

          <label className="block text-gray-600 mb-2 font-medium">
            Select Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Time */}

        <div className="mb-4">

          <label className="block text-gray-600 mb-2 font-medium">
            Select Time
          </label>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Payment Method */}

        <div className="mb-6">

          <label className="block text-gray-600 mb-2 font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >

            <option value="cash">Cash on Visit</option>
            <option value="jazzcash">JazzCash</option>
            <option value="easypaisa">EasyPaisa</option>

          </select>

        </div>

        {/* Button */}

        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold transition hover:bg-blue-700 hover:scale-[1.02]"
        >
          Confirm Appointment
        </button>

      </div>

    </div>

  );
};

export default BookAppointment;
