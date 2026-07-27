
import { useEffect, useRef, useState } from "react";
import API from "../../services/axiosInstance";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyForm = {
  name: "",
  email: "",
  password: "",
  specialization: "",
  experience: "",
  fees: "",
  hospitalName: "",
  status: true,
};

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [pictureFile, setPictureFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  // HANDLE TEXT/NUMBER INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // HANDLE PICTURE SELECTED FROM DEVICE
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPictureFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // RESET FORM
  const resetForm = () => {
    setForm(emptyForm);
    setPictureFile(null);
    setPreviewUrl("");
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ADD OR UPDATE DOCTOR
  const submitDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      if (form.password) data.append("password", form.password);
      data.append("specialization", form.specialization);
      data.append("experience", form.experience);
      data.append("fees", form.fees);
      data.append("hospitalName", form.hospitalName);
      data.append("status", form.status);

      if (pictureFile) {
        data.append("picture", pictureFile);
      }

      if (editingId) {
        // UPDATE EXISTING DOCTOR
        await API.put(`/admin/doctors/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // ADD NEW DOCTOR (status true by default)
        await API.post("/admin/doctors", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      loadDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert(error.response?.data?.message || "Error saving doctor");
    } finally {
      setLoading(false);
    }
  };

  // START EDITING A DOCTOR
  const startEdit = (doc) => {
    setEditingId(doc._id);
    setForm({
      name: doc.user?.name || "",
      email: doc.user?.email || "",
      password: "",
      specialization: doc.specialization || "",
      experience: doc.experience || "",
      fees: doc.fees || "",
      hospitalName: doc.hospitalName || "",
      status: doc.status,
    });
    setPictureFile(null);
    setPreviewUrl(doc.picture ? `${BASE_URL}/uploads/doctors/${doc.picture}` : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // TOGGLE DOCTOR STATUS (active / inactive)
  const toggleStatus = async (id) => {
    try {
      await API.patch(`/admin/doctors/${id}/status`);
      loadDoctors();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // DELETE DOCTOR
  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

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

      {/* ADD / EDIT DOCTOR */}
      <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          {editingId ? "Update Doctor" : "Add New Doctor"}
        </h2>

        <form onSubmit={submitDoctor} className="grid md:grid-cols-2 gap-6">

          {/* PICTURE UPLOAD */}
          <div className="md:col-span-2 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm text-center px-2">
                  No Picture
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Doctor Picture
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

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
            placeholder={editingId ? "New Password (optional)" : "Password"}
            value={form.password}
            onChange={handleChange}
            required={!editingId}
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
            name="experience"
            type="number"
            placeholder="Experience (years)"
            value={form.experience}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="fees"
            type="number"
            placeholder="Fees"
            value={form.fees}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            name="hospitalName"
            placeholder="Hospital Name"
            value={form.hospitalName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          {/* STATUS - only shown while editing, new doctors are active by default */}
          {editingId && (
            <label className="flex items-center gap-3 border p-3 rounded-lg">
              <input
                type="checkbox"
                checked={form.status === true || form.status === "true"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.checked })
                }
              />
              <span>Doctor Active</span>
            </label>
          )}

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Doctor"
                : "Add Doctor"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>

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
                <th className="p-3">Picture</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id} className="border-b">

                  <td className="p-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      {doc.picture ? (
                        <img
                          src={`${BASE_URL}/uploads/doctors/${doc.picture}`}
                          alt={doc.user?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </div>
                  </td>

                  <td className="p-3">
                    {doc.user?.name}
                  </td>

                  <td className="p-3">
                    {doc.user?.email}
                  </td>

                  <td className="p-3">
                    {doc.specialization}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(doc._id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${
                        doc.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                      title="Click to toggle status"
                    >
                      {doc.status ? "Active" : "Inactive"}
                    </button>
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => startEdit(doc)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteDoctor(doc._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
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
