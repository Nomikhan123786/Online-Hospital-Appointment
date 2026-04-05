import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../../style/auth.css";

const Login = () => {

  const [form, setForm] = useState({});
  const [error, setError] = useState("");   // error state

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const { data } = await API.post("/auth/login", form);

      login(data);
        localStorage.setItem("user", JSON.stringify(data));
      const role = data.role;

      if (role === "admin") {
        navigate("/admin/doctors");
      }

      else if (role === "doctor") {
        navigate("/doctor/dashboard");
      }

      else {
        navigate("/");
      }

    } catch (err) {

      setError("Email or Password Invalid"); // show error

    }

  };

  return (

    <div className="auth-container">

      <h2>Login</h2>

      

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      {/* ERROR MESSAGE */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error}  <br />
          <span style={{color:"blue"}}><Link to="/register"> If not Registered click here</Link></span>
        </p>
        
      )}

      <button onClick={handleLogin}>
        Login
      </button>

      <div className="auth-link">
        <Link to="/forgot-password">
          Forgot Password?
        </Link>
      </div>

    </div>

  );
};

export default Login;