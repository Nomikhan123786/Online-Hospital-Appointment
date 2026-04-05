import { useState, useEffect } from "react";
import API from "../../services/axiosInstance";

const ManageSchedule = () => {

  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);

      const res = await API.get("/doctors/schedule");

      setSchedule(res.data.schedule || []);

    } catch (error) {
      console.error("Error fetching schedule:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (e) => {
    e.preventDefault();

    try {
      await API.post("/doctors/schedule", {
        date,
        time,
      });

      setDate("");
      setTime("");

      fetchSchedule();

    } catch (error) {
      console.error("Error adding schedule:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Schedule</h2>

      {/* Add Slot */}
      <div className="card">
        <h3>Add Available Slot</h3>

        <form onSubmit={addSchedule}>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ padding: "8px", marginRight: "10px" }}
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            style={{ padding: "8px", marginRight: "10px" }}
          />

          <button
            type="submit"
            style={{
              padding: "8px 15px",
              background: "#2a5298",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Slot
          </button>

        </form>
      </div>

      {/* Schedule List */}
      <div className="card">
        <h3>Available Slots</h3>

        {loading ? (
          <p>Loading schedule...</p>
        ) : schedule.length === 0 ? (
          <p>No schedule added yet.</p>
        ) : (
          <table style={{ width: "100%", marginTop: "15px" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {schedule.map((slot, index) => (
                <tr key={index}>
                  <td>{new Date(slot.date).toLocaleDateString()}</td>
                  <td>{slot.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default ManageSchedule;