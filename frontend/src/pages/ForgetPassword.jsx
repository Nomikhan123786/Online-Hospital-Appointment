import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/forgot", { email });
    alert("Check console for reset token.");
  };

  return (
    <form onSubmit={submit}>
      <input type="email" placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)} />
      <button>Send Reset Link</button>
    </form>
  );
}