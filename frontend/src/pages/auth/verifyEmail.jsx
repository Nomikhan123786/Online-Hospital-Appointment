import { useState } from "react";
import API from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import '../../style/auth.css'

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    await API.post("/auth/verify-email", { email, otp });
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="6-digit OTP" onChange={(e)=>setOtp(e.target.value)} />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default VerifyEmail;