import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await API.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-[420px]">

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Dr. {doctor.user?.name}
        </h2>

        <div className="space-y-3 text-gray-700">

          <p>
            <span className="font-semibold">Specialization:</span>{" "}
            {doctor.specialization}
          </p>

          <p>
            <span className="font-semibold">Email:</span>{" "}
            {doctor.user?.email}
          </p>

          <p>
            <span className="font-semibold">Experience:</span>{" "}
            {doctor.experience} Years
          </p>

        </div>

        <button
          onClick={() => navigate(`/book/${doctor._id}`)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
        >
          Book Appointment
        </button>

      </div>

    </div>
  );
};

export default DoctorDetail;