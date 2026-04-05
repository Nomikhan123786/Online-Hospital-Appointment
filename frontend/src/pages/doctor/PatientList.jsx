import { useEffect, useState } from "react";
import API from "../../services/axiosInstance";
import "../../style/auth.css"
const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
 

  const fetchPatients = async () => {
    try {
      const res = await API.get( "/doctors/patient", {
          headers: { Authorization: `Bearer ${token}` },
        }
      );


      // Filter unique patients
      const uniquePatients = [];
      const ids = new Set();

      res.data.forEach((appt) => {
        if (appt.patient && !ids.has(appt.patient._id)) {
          ids.add(appt.patient._id);
          uniquePatients.push(appt.patient);
        }
      });

      setPatients(uniquePatients);
    } catch (error) {
      console.log(error);
    }
  };
     fetchPatients();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>My Patients</h2>

      <div className="card">
        {patients.length === 0 ? (
          <p>No patients yet.</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientList;