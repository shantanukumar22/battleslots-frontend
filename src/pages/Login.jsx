// import { useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });
//       login(res.data.token);
//       toast.success("Login successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-8 rounded-xl space-y-4 w-full max-w-md"
//       >
//         <h2 className="text-white text-3xl text-center mb-6">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-3 rounded bg-gray-700 text-white"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full p-3 rounded bg-gray-700 text-white"
//         />
//         <button
//           type="submit"
//           className="w-full bg-indigo-600 p-3 rounded text-white font-bold"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect if already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login",  {
        email,
        password,
      });
      login(res.data.token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl space-y-4 w-full max-w-md"
      >
        <h2 className="text-white text-3xl text-center mb-6">Login</h2>
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
          Login
        </button>

        <p className="text-gray-400 text-center">
          New user?{" "}
          <Link
            to="/register"
            className="text-indigo-400 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
