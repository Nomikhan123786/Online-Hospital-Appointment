import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import API from "../../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../../style/auth.css";

const Login = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState(""); // error state

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container animate-[fadeIn_0.6s_ease-in]">
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "20px",

            background: "none",
            width: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🚫" : "👁️"}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {error} <br />
          <span style={{ color: "blue" }}>
            <Link to="/register"> If not Registered click here</Link>
          </span>
        </p>
      )}

      <button onClick={handleLogin}>Login</button>

      <div className="auth-link">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
