import { useState } from "react";
import API from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import '../../style/auth.css'

const ResetPassword = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleReset = async () => {
    await API.post("/auth/reset-password", form);
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})} />

      <input placeholder="OTP"
        onChange={(e)=>setForm({...form,otp:e.target.value})} />

      <input type="password" placeholder="New Password"
        onChange={(e)=>setForm({...form,newPassword:e.target.value})} />

      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetPassword;