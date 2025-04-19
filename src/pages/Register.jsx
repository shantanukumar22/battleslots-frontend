// import { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AuthContext } from "../context/authContext";
// import axiosInstance from "../utils/AxiosInstance";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [valorantName, setValorantName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate("/"); // Redirect if already logged in
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/auth/register", {
//         username,
//         valorantName,
//         email,
//         password,
//       });
//       toast.success("Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-900">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-800 p-8 rounded-xl space-y-4 w-full max-w-md"
//       >
//         <h2 className="text-white text-3xl text-center mb-6">Create Account</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className="w-full p-3 rounded bg-gray-700 text-white"
//         />
//         <input
//           type="text"
//           placeholder="Valorant Username"
//           value={valorantName}
//           onChange={(e) => setValorantName(e.target.value)}
//           required
//           className="w-full p-3 rounded bg-gray-700 text-white"
//         />
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
//           Register
//         </button>

//         <p className="text-gray-400 text-center">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-400 hover:underline font-semibold"
//           >
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Register;
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import axiosInstance from "../utils/AxiosInstance";

function Register() {
  const [username, setUsername] = useState("");
  const [valorantName, setValorantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", {
        username,
        valorantName,
        email,
        password,
      });
      toast.success("Registration successful! Welcome to BattleSlot ");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
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

      {/* Registration Form */}
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-red-500 opacity-10 blur-xl rounded-xl"></div>
        <form
          onSubmit={handleSubmit}
          className="relative bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-2xl space-y-6 w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="h-1 w-12 bg-red-500 rounded"></div>
            <h2 className="text-white text-2xl font-bold mx-4">REGISTER</h2>
            <div className="h-1 w-12 bg-red-500 rounded"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm font-medium block mb-1">
                Valorant Username
              </label>
              <input
                type="text"
                placeholder="Your in-game Valorant username"
                value={valorantName}
                onChange={(e) => setValorantName(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter your exact Valorant username, including tags (e.g.,
                Player#NA1)
              </p>
            </div>
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
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 characters recommended
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-red-600 to-red-500 p-3 rounded text-white font-bold uppercase tracking-wide transition-all duration-200 hover:from-red-500 hover:to-red-400 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
            }`}
          >
            {isLoading ? "Creating Account..." : "Join "}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-red-400 hover:text-red-300 font-semibold transition duration-200"
              >
                Log in here
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Tournament Info */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">
          By registering, you agree to our{" "}
          <a href="#" className="text-red-400 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-red-400 hover:underline">
            Policies
          </a>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © 2025 BattleSlot . All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
