import { useState, useEffect } from "react";
import API from "../../services/axiosInstance";

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, []);



  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const res = await API.get("/doctors/schedule");
      setSchedule(res.data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (e) => {
    e.preventDefault();
    console.log("starttime",startTime)
    try {
      await API.post("/doctors/schedule", { date, startTime,endTime });
      setDate("");
      setStartTime("");
      setEndTime("");
      fetchSchedule();
    } catch (error) {
      console.error("FULL ERROR:", error);
      console.log("ERROR RESPONSE:", error.response);
    }
  };
  const deleteSlot = async (index) => {
  try {
    await API.delete(`/doctors/schedule/${index}`);
    fetchSchedule(); 
  } catch (error) {
    console.error("Delete Error:", error);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 animate-[fadeIn_0.6s_ease-in]">
      
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Manage Schedule
      </h2>

      {/* Add Slot Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Add Available Slot
        </h3>

        <form
            onSubmit={addSchedule}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            
            {/* Date */}
            <div className="flex items-center gap-3">
              <label className="w-28 font-semibold text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          
            {/* Start Time */}
            <div className="flex items-center gap-3">
              <label className="w-28 font-semibold text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>
          
            {/* End Time */}
            <div className="flex items-center gap-3">
              <label className="w-28 font-semibold text-gray-700">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              />
            </div>
          
            {/* Button */}
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-md transition duration-200"
              >
                + Add Slot
              </button>
            </div>
          
        </form>
      </div>

      {/* Schedule Table */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Available Slots
        </h3>

        {loading ? (
          <p className="text-gray-500 animate-pulse">
            Loading schedule...
          </p>
        ) : schedule.length === 0 ? (
          <p className="text-gray-500">No schedule added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-y-2">
             
             {/* HEADER */}
             <thead>
               <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                 <th className="p-3 text-left rounded-l-xl">Day</th>
                 <th className="p-3 text-left">Start</th>
                 <th className="p-3 text-left">End</th>
                 <th className="p-3 text-left rounded-r-xl">Action</th>
               </tr>
             </thead>
            
             {/* BODY */}
             <tbody>
               {schedule.map((slot, index) => (
                 <tr
                   key={index}
                   className="bg-white shadow-sm hover:bg-blue-50 transition rounded-xl"
                 >
                   <td className="p-3 text-blue-500 font-medium">
                     {slot.day}
                   </td>
            
                   <td className="p-3 text-green-600 font-semibold">
                     {slot.startTime}
                   </td>
            
                   <td className="p-3 text-purple-600 font-semibold">
                     {slot.endTime}
                   </td>
            
                   <td className="p-3">
                     <button
                       onClick={() => deleteSlot(index)}
                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm shadow"
                     >
                       Delete
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

};

export default ManageSchedule;