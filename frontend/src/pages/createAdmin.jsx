import { useState } from "react";
import API from "../services/axiosInstance";

function CreateAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Basic validation
    if (!form.name || !form.email || !form.password) {
      return alert("All fields are required");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/create-admin", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert(res.data.msg);

      // ✅ Reset form after success
      setForm({
        name: "",
        email: "",
        password: "",
      });

    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);

      alert(
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Error creating admin"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Admin</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Admin"}
        </button>
      </form>
    </div>
  );
}

export default CreateAdmin;