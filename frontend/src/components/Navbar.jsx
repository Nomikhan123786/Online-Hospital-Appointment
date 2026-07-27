import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import '../style/index.css'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("user"));
  const role = userData?.role;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass =
    "block sm:inline-block py-2 sm:py-0 text-ink-600 font-medium hover:text-brand-600 transition-colors";

  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-ink-100 px-4 sm:px-6 lg:px-8 py-3.5 animate-fade-in relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white bg-brand-600">
            +
          </div>
          <h1 className="text-lg sm:text-xl font-display font-bold text-ink-900">
            MediCare<span className="text-brand-600">+</span>
          </h1>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex sm:items-center sm:gap-6">
          {role === "admin" && (
            <>
              <Link to="/admin/dashboard" className={linkClass}>Dashboard</Link>
              <Link to="/admin/doctors" className={linkClass}>Manage Doctors</Link>
            </>
          )}

          {role === "patient" && (
            <>
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/dashboard" className={linkClass}>Dashboard</Link>
              <Link to="/appointments" className={linkClass}>Appointments</Link>
            </>
          )}

          {role === "doctor" && (
            <>
              <Link to="/doctor/dashboard" className={linkClass}>Dashboard</Link>
              <Link to="/doctor/patients" className={linkClass}>Patients</Link>
              <Link to="/doctor/schedule" className={linkClass}>Schedule</Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="text-ink-600 px-4 py-2 rounded-lg hover:text-brand-600 font-medium transition-colors"
            >
              Logout
            </button>
          )}

          {!user && (
            <>
              <Link to="/login" className="text-ink-600 px-4 py-2 rounded-lg hover:text-brand-600 font-medium transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-ink-800 transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink-800 transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-ink-800 transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="sm:hidden mt-4 pb-2 border-t border-ink-100 pt-3 flex flex-col gap-1">
          {role === "admin" && (
            <>
              <Link to="/admin/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/admin/doctors" className={linkClass} onClick={() => setOpen(false)}>Manage Doctors</Link>
            </>
          )}

          {role === "patient" && (
            <>
              <Link to="/" className={linkClass} onClick={() => setOpen(false)}>Home</Link>
              <Link to="/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/appointments" className={linkClass} onClick={() => setOpen(false)}>Appointments</Link>
            </>
          )}

          {role === "doctor" && (
            <>
              <Link to="/doctor/dashboard" className={linkClass} onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/doctor/patients" className={linkClass} onClick={() => setOpen(false)}>Patients</Link>
              <Link to="/doctor/schedule" className={linkClass} onClick={() => setOpen(false)}>Schedule</Link>
            </>
          )}

          {user && (
            <button
              onClick={() => { setOpen(false); handleLogout(); }}
              className="text-left text-ink-600 py-2 font-medium hover:text-brand-600"
            >
              Logout
            </button>
          )}

          {!user && (
            <>
              <Link to="/login" className={linkClass} onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" className={linkClass} onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;