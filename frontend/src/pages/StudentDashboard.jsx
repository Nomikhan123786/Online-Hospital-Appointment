import { useEffect, useState } from "react";
import axios from "axios";


export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    department: "",
    gallery: "",
    classroom: "",
    issue: "",
    file: null
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchComplaints();

    socket.on("newComplaint", (data) => {
      setComplaints(prev => [...prev, data]);
    });

    socket.on("statusUpdated", (data) => {
      setComplaints(prev =>
        prev.map(c => c._id === data._id ? data : c)
      );
    });
  }, []);

  const fetchComplaints = async () => {
    const { data } = await axios.get("http://localhost:5000/api/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });

    await axios.post("http://localhost:5000/api/complaints", formData, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setForm({
      department: "",
      gallery: "",
      classroom: "",
      issue: "",
      file: null
    });
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <form onSubmit={submit}>
        <input placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })} />

        <input placeholder="Gallery"
          value={form.gallery}
          onChange={(e) => setForm({ ...form, gallery: e.target.value })} />

        <input placeholder="Classroom"
          value={form.classroom}
          onChange={(e) => setForm({ ...form, classroom: e.target.value })} />

        <textarea placeholder="Issue"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })} />

        <input type="file"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })} />

        <button>Submit Complaint</button>
      </form>

      <hr />

      {complaints.map(c => (
        <div key={c._id} style={{ border: "1px solid gray", margin: 10, padding: 10 }}>
          <h4>{c.department} - {c.classroom}</h4>
          <p>{c.issue}</p>
          <strong>Status: {c.status}</strong>
        </div>
      ))}
    </div>
  );
}