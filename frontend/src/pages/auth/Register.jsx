import { useState } from "react";
import API from "../../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "../../style/auth.css";

const Register = () => {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ✅ Password Validation Function
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // ✅ Live validations
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  // ✅ Submit
  const handleSubmit = async () => {
    if (!validatePassword(password)) {
      setError(
        "Password must be 8+ chars, include uppercase, number & special character"
      );
      return;
    }

    try {
      await API.post("/auth/register", {
        ...form,
        password,
      });
      alert("OTP sent to your Email");
      navigate("/verify-email");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      {/* Password Field */}
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "20px",
            width:"20px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🚫" : "👁️"}
        </button>
      </div>

      {/* Live Validation */}
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p style={{ color: validations.length ? "green" : "red" }}>
          {validations.length ? "✔" : "❌"} Minimum 8 characters
        </p>

        <p style={{ color: validations.uppercase ? "green" : "red" }}>
          {validations.uppercase ? "✔" : "❌"} One uppercase letter
        </p>

        <p style={{ color: validations.lowercase ? "green" : "red" }}>
          {validations.lowercase ? "✔" : "❌"} One lowercase letter
        </p>

        <p style={{ color: validations.number ? "green" : "red" }}>
          {validations.number ? "✔" : "❌"} One number
        </p>

        <p style={{ color: validations.special ? "green" : "red" }}>
          {validations.special ? "✔" : "❌"} One special character
        </p>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>Register</button>

      <div className="auth-link">
        <Link to="/login">Already have account?</Link>
      </div>
    </div>
  );
};

export default Register;