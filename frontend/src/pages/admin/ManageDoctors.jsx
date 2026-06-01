import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const ManageDoctors = () => {

  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    consultationFee: "",
    profileImage: "",
  });

  // =========================
  // Load Doctors
  // =========================

  const loadDoctors = async () => {

    try {

      const res = await API.get("/admin/doctors");

      setDoctors(res.data);

    } catch (error) {

      console.error(
        "Error fetching doctors:",
        error
      );

    }

  };

  useEffect(() => {
    loadDoctors();
  }, []);

  // =========================
  // Handle Input
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // Add Doctor
  // =========================

  const addDoctor = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/admin/doctors",
        form
      );

      // Reset Form
      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        consultationFee: "",
        profileImage: "",
      });

      loadDoctors();

    } catch (error) {

      console.error(
        "Error adding doctor:",
        error
      );

    }

  };

  // =========================
  // Delete Doctor
  // =========================

  const deleteDoctor = async (id) => {

    try {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this doctor?"
      );

      if (!confirmDelete) return;

      await API.delete(
        `/admin/doctors/${id}`
      );

      loadDoctors();

    } catch (error) {

      console.error(
        "Error deleting doctor:",
        error
      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Doctor Management
      </h1>

      {/* Add Doctor */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Add New Doctor
        </h2>

        <form
          onSubmit={addDoctor}
          className="grid md:grid-cols-2 gap-6"
        >

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
            type="email"
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

          <input
            name="consultationFee"
            type="number"
            placeholder="Consultation Fee"
            value={form.consultationFee}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="profileImage"
            type="text"
            placeholder="Profile Image URL"
            value={form.profileImage}
            onChange={handleChange}
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

      {/* Doctor List */}
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          All Doctors
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-200 text-left">

                <th className="p-3">
                  Profile
                </th>

                <th className="p-3">
                  Name
                </th>

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Specialization
                </th>

                <th className="p-3">
                  Fee
                </th>

                <th className="p-3 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {doctors.map((doc) => (

                <tr
                  key={doc._id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Profile */}
                  <td className="p-3">

                    <img
                      src={
                        doc.profileImage
                          ? doc.profileImage
                          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt="doctor"
                      className="w-14 h-14 rounded-full object-cover border"
                    />

                  </td>

                  {/* Name */}
                  <td className="p-3 font-medium">
                    {doc.user?.name}
                  </td>

                  {/* Email */}
                  <td className="p-3">
                    {doc.user?.email}
                  </td>

                  {/* Specialization */}
                  <td className="p-3">
                    {doc.specialization}
                  </td>

                  {/* Fee */}
                  <td className="p-3 text-indigo-600 font-semibold">
                    Rs. {doc.consultationFee || 0}
                  </td>

                  {/* Delete */}
                  <td className="p-3 text-center">

                    <button
                      onClick={() =>
                        deleteDoctor(doc._id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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