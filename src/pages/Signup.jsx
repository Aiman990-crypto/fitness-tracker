import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/storage";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    saveUser({ email, password });
    alert("Account created!");
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          className="border w-full p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-green-500 text-white w-full p-2"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
