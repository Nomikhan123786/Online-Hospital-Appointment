import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/api/auth/reset/${token}`,
      { password }
    );
    alert("Password Updated");
  };

  return (
    <form onSubmit={submit}>
      <input type="password" placeholder="New Password"
        onChange={(e) => setPassword(e.target.value)} />
      <button>Reset Password</button>
    </form>
  );
}