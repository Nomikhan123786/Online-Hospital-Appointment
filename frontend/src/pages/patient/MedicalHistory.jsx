import { useEffect, useState } from "react";
import axios from "axios";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  const token = localStorage.getItem("token");
     const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/patients/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setHistory(res.data?.medicalHistory || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const addHistory = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        "http://localhost:5000/api/patients/profile",
        {
          medicalHistory: [
            ...history,
            {
              condition,
              notes,
              date: new Date(),
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCondition("");
      setNotes("");

      fetchHistory(); 
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div style={{ padding: "30px" }} className="animate-[fadeIn_0.6s_ease-in]">
      <h2>Medical History</h2>

      <div className="card">
        <h3>Add New Record</h3>

        <form onSubmit={addHistory}>
          <input
            type="text"
            placeholder="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />

          <button
            type="submit"
            style={{
              padding: "8px 15px",
              background: "#1e3c72",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Record
          </button>
        </form>
      </div>

      <div className="card">
        <h3>Previous Records</h3>

        {history.length === 0 ? (
          <p>No history found</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #eee",
                padding: "10px 0",
              }}
            >
              <strong>{item.condition}</strong>
              <p>{item.notes}</p>
              <small>{new Date(item.date).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;