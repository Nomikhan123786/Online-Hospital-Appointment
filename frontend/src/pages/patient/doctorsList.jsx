import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../style/index.css'
const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Available Doctors
        </h2>
        <p className="text-gray-500 mt-2">
          Choose from our experienced specialists
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center"
          >
            
            {/* Doctor Avatar */}
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold mb-4">
              {doc.user.name.charAt(0)}
            </div>

            {/* Doctor Name */}
            <h3 className="text-lg font-semibold text-gray-800">
              {doc.user.name}
            </h3>

            {/* Specialization */}
            <p className="text-sm text-blue-600 font-medium mt-1">
              {doc.specialization}
            </p>

            {/* Fees */}
            <p className="text-gray-500 mt-2">
              Consultation Fee
            </p>
            <p className="text-xl font-bold text-gray-800">
              ${doc.fees}
            </p>

            {/* Button */}
            <Link
              to={`/doctor/${doc._id}`}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorsList;