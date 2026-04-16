import { useState } from "react";
import API from "../../services/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import '../../style/auth.css'

const Register = () => {
  const [form, setForm] = useState({});
 
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await API.post("/auth/register", form);
    alert("OTP sent to your Email")
    navigate("/verify-email");
  };


  return (
    <div className="auth-container animate-[fadeIn_0.6s_ease-in]">
      <h2>Create Account</h2>

      <input placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})} />

      <input placeholder="Email"
        onChange={(e) => setForm({...form, email: e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e) => setForm({...form, password: e.target.value})} />

      <button onClick={handleSubmit}>Register</button>

      <div className="auth-link">
        <Link to="/login">Already have account?</Link>
      </div>
    </div>
  );
};

export default Register;