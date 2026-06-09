import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();

    socket.on("newComplaint", (data) => {
      setComplaints(prev => [...prev, data]);
    });
  }, []);

  const fetchComplaints = async () => {
    const { data } = await axios.get("http://localhost:5000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/complaints/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {complaints.map(c => (
        <div key={c._id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <h4>{c.student?.name}</h4>
          <p>{c.issue}</p>

          <select
            value={c.status}
            onChange={(e) => updateStatus(c._id, e.target.value)}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      ))}
    </div>
  );
}