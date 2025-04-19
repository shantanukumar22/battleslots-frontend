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
// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/authContext";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axiosInstance from "../utils/AxiosInstance";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user, login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/"); // redirect if already logged in
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/auth/login", {
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

//         <p className="text-gray-400 text-center">
//           New user?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-400 hover:underline font-semibold"
//           >
//             Register here
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // redirect if already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      login(res.data.token);
      toast.success("Login successful! Welcome to BattleSlot.");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Logo and Header */}
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
          BATTLESLOT
        </h1>
        <p className="text-red-500 font-medium uppercase tracking-widest text-sm">
          AIM TO WIN
        </p>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-red-500 opacity-10 blur-xl rounded-xl"></div>
        <form
          onSubmit={handleSubmit}
          className="relative bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl space-y-6 w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="h-1 w-12 bg-red-500 rounded"></div>
            <h2 className="text-white text-2xl font-bold mx-4">LOGIN</h2>
            <div className="h-1 w-12 bg-red-500 rounded"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-red-600 to-red-500 p-3 rounded text-white font-bold uppercase tracking-wide transition-all duration-200 hover:from-red-500 hover:to-red-400 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
            }`}
          >
            {isLoading ? "Logging in..." : "Login to Compete"}
          </button>

          <div className="flex items-center justify-evenly text-sm pt-2">
            {/* <a
              href="#"
              className="text-gray-400 hover:text-red-400 transition duration-200"
            >
              Forgot password?
            </a> */}
            <Link
              to="/register"
              className="text-red-400 hover:text-red-300 font-semibold transition duration-200"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>

      {/* Tournament Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          Need help? Contact{" "}
          <span className="text-red-400">battleslotsofficial@gmail.com</span>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © 2025 BattleSlot All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
