import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/axiosInstance";

const DoctorDetail = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const res = await API.get(`/doctors/${id}`);
      setDoctor(res.data);
    } catch (error) {
      console.log("Error fetching doctor:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Booking Function
  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a slot first");
      return;
    }

    try {
      const today = new Date().toISOString().split("T")[0];

      await API.post("/appointments", {
        doctorId: doctor?._id,
        date: today,
        time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
        paymentMethod, // ✅ added
      });

      alert("Appointment booked successfully ✅");
      setSelectedSlot(null);
    } catch (error) {
      console.log("Booking error:", error);
      alert("Booking failed ❌");
    }
  };

  // 🚨 Emergency Function (IMPROVED)
  const handleEmergency = async () => {
    try {
      await API.post("/appointments/emergency", {
        doctorId: doctor?._id,
      });

      alert("🚨 Emergency request sent to doctor!");
    } catch (error) {
      console.log("Emergency error:", error);
      alert("Failed to send emergency request ❌");
    }
  };

  if (loading)
    return <p className="text-gray-500 animate-pulse">Loading...</p>;

  if (!doctor) return <p className="p-6">Doctor not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">

      {/* Doctor Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dr. {doctor?.user?.name}
        </h1>

        <p className="text-gray-500 mt-1">
          {doctor?.specialization}
        </p>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Available Slots
        </h2>

        {doctor.schedule?.length === 0 ? (
          <p className="text-gray-500">No slots available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {doctor.schedule.map((slot, index) => {
              const isSelected =
                selectedSlot?.day === slot.day &&
                selectedSlot?.startTime === slot.startTime;

              return (
                <div
                  key={index}
                  onClick={() => setSelectedSlot(slot)}
                  className={`cursor-pointer border rounded-xl p-4 transition ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50"
                  }`}
                >
                  <p className="font-semibold">{slot.day}</p>

                  <p className="text-sm">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
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

      {/* Booking + Emergency Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <p className="text-gray-600">Selected Slot:</p>

          {selectedSlot ? (
            <p className="font-semibold text-gray-800">
              {selectedSlot.day} • {selectedSlot.startTime} - {selectedSlot.endTime}
            </p>
          ) : (
            <p className="text-gray-400">No slot selected</p>
          )}
        </div>

        {/* ✅ Buttons */}
        <div className="flex gap-3">

          <button
            onClick={handleBooking}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow"
          >
            Book Appointment
          </button>

          <button
            onClick={handleEmergency}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow animate-pulse"
          >
            🚨 Emergency
          </button>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;