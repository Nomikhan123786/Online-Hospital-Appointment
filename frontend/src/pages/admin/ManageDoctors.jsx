
import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });

  // LOAD DOCTORS
  
  const loadDoctors = async () => {
    try {
      const res = await API.get("/admin/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD DOCTOR
  const addDoctor = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/doctors", form);

      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
      });

      loadDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    try {
      await API.delete(`/admin/doctors/${id}`);
      loadDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 animate-[fadeIn_0.6s_ease-in]">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Doctor Management
      </h1>

      {/* ADD DOCTOR */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Add New Doctor
        </h2>

        <form onSubmit={addDoctor} className="grid md:grid-cols-2 gap-6">

          <input
            name="name"
            placeholder="Doctor Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="email"
            placeholder="Doctor Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
          >
            Add Doctor
          </button>

        </form>
      </div>

      {/* DOCTOR LIST */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          All Doctors
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Specialization</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id} className="border-b">

                  <td className="p-3">
                    {doc.user?.name}
                  </td>

                  <td className="p-3">
                    {doc.user?.email}
                  </td>

                  <td className="p-3">
                    {doc.specialization}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => deleteDoctor(doc._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default ManageDoctors;

