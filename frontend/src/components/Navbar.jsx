import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../style/index.css'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const userData= JSON.parse(localStorage.getItem("user"))
  const role=userData?.role
  console.log("ROLE",role)
  return (
    
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center animate-[fadeIn_0.6s_ease-in-out]">
       <h1 className="text-2xl font-bold text-blue">
        MediCare+
      </h1>
        <div className="space-x-6">
        {role === "admin" && (
        <>
          <Link to="/admin/dashboard"    className=" hover:text-blue-600  hover:text-2xl">Dashboard</Link>
          <Link to="/admin/doctors"      className=" hover:text-blue-600  hover:text-2xl"> Manage Doctors</Link>
         
        </>
      )}

      {
        role ==="patient" &&(
          <>
          <Link to="/" className=" hover:text-blue-600  hover:text-2xl">
            Home
          </Link>
            <Link to="/dashboard" className=" hover:text-blue-600  hover:text-2xl">
              Dashboard
            </Link>
            <Link to="/appointments" className="text-gray-700 hover:text-blue-600  hover:text-2xl">
              Appointments
            </Link>
            
          </>
        )
      }
      {
        role ==="doctor" && (
          <>
          <Link to="/doctor/dashboard"    className="text-gray-700 hover:text-blue-600  hover:text-2xl">Dashboard</Link>         
          <Link to="/doctor/schedule" className="text-gray-700 hover:text-blue-600  hover:text-2xl">Schedule</Link>
          </>
        )
      }
      
      
    
        

        {user && (
          <>
           

            <button
              onClick={logout}
              className=" text-gray-700 px-4 py-2 rounded-lg hover:text-blue-600 hover:text-2xl"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <Link to="/login" className="bg-primary text-gray-700 px-4 py-2 rounded-lg hover:text-blue" >
            Login
          </Link>
        )}
        {!user && (
          <Link to="/register" className="bg-primary text-gray-700 px-4 py-2 rounded-lg hover:text-blue">
            Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;