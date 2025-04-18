import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import axiosInstance from "../utils/AxiosInstance";

function Register() {
  const [username, setUsername] = useState("");
  const [valorantName, setValorantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", {
        username,
        valorantName,
        email,
        password,
      });
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl space-y-4 w-full max-w-md"
      >
        <h2 className="text-white text-3xl text-center mb-6">Create Account</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Valorant Username"
          value={valorantName}
          onChange={(e) => setValorantName(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 p-3 rounded text-white font-bold"
        >
          Register
        </button>

        <p className="text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
