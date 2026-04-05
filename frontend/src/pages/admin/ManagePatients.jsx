import { useEffect, useState } from "react";

import API from "../../services/axiosInstance";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const token = localStorage.getItem("token");
   useEffect(() => {
  const fetchPatients = async () => {
    try {
      const res = await API.get( "/admin/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

      fetchPatients();
    
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Manage Patients</h2>

      <div className="card">
        {patients.length === 0 ? (
          <p>No patients found</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((pat) => (
                <tr key={pat.user?._id}>
                  <td>{pat.user?.name}</td>
                  <td>{pat.user?.email}</td>
                  <td>
                    {new Date(pat.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagePatients;