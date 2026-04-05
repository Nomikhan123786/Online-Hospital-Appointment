import { useState } from "react";
import API from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import '../../style/auth.css'
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      const res = await API.post("/auth/forgot-password", { email });

      alert(res.data.message || "OTP Sent Successfully");

      navigate("/reset-password", { state: { email } });

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      <input placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)} />

      <button onClick={handleSend}>OTP send</button>
    </div>
  );
};

export default ForgotPassword;