// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";

// function Profile() {
//   const [profile, setProfile] = useState({
//     username: "",
//     valorantName: "",
//     email: "",
//     upiId: "",
//     profilePic: "",
//   });

//   // Fetch existing profile data
//   const fetchProfile = async () => {
//     try {
//       const res = await axiosInstance.get("/users/me");
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Failed to fetch profile:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // Update local state on input change
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // Submit updated profile to backend
//   const handleUpdate = async () => {
//     try {
//       const { username, valorantName, email, upiId, profilePic } = profile;
//       await axiosInstance.put("/users/update-profile", {
//         username,
//         valorantName,
//         email,
//         upiId,
//         profilePic,
//       });
//       toast.success("Profile updated successfully!");
//       fetchProfile();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 text-white space-y-6 max-w-2xl mx-auto">
//       <h2 className="text-3xl font-bold">👤 My Profile</h2>

//       {/* Profile Pic */}
//       <div className="flex flex-col items-center space-y-4">
//         <img
//           src={
//             profile.profilePic
//               ? profile.profilePic
//               : "https://placehold.co/120x120/png"
//           }
//           alt="Profile"
//           className="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
//         />

//         <input
//           type="text"
//           name="profilePic"
//           placeholder="Profile Picture URL"
//           value={profile.profilePic}
//           onChange={handleChange}
//           className="w-full p-2 bg-gray-800 rounded text-white"
//         />
//       </div>

//       {/* Other Profile Fields */}
//       <input
//         type="text"
//         name="username"
//         placeholder="Username"
//         value={profile.username}
//         onChange={handleChange}
//         className="w-full p-3 rounded bg-gray-800 text-white"
//       />

//       <input
//         type="text"
//         name="valorantName"
//         placeholder="Valorant Username"
//         value={profile.valorantName}
//         onChange={handleChange}
//         className="w-full p-3 rounded bg-gray-800 text-white"
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={profile.email}
//         onChange={handleChange}
//         className="w-full p-3 rounded bg-gray-800 text-white"
//       />

//       <input
//         type="text"
//         name="upiId"
//         placeholder="UPI ID"
//         value={profile.upiId}
//         onChange={handleChange}
//         className="w-full p-3 rounded bg-gray-800 text-white"
//       />

//       <button
//         onClick={handleUpdate}
//         className="w-full bg-indigo-600 p-3 rounded font-semibold hover:bg-indigo-700"
//       >
//         Update Profile
//       </button>
//     </div>
//   );
// }

// export default Profile;

// !passive gaming style

// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";
// import { User, Zap, Crosshair, Mail, Wallet, Check } from "lucide-react";

// function Profile() {
//   const [profile, setProfile] = useState({
//     username: "",
//     valorantName: "",
//     email: "",
//     upiId: "",
//     profilePic: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Fetch existing profile data
//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("/users/me");
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Failed to fetch profile:", err);
//       toast.error("Failed to load profile data", { theme: "dark" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   // Update local state on input change
//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // Submit updated profile to backend
//   const handleUpdate = async () => {
//     setLoading(true);
//     try {
//       const { username, valorantName, email, upiId, profilePic } = profile;
//       await axiosInstance.put("/users/update-profile", {
//         username,
//         valorantName,
//         email,
//         upiId,
//         profilePic,
//       });
//       toast.success("Profile updated successfully!", { theme: "dark" });
//       fetchProfile();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile", {
//         theme: "dark",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Top header with background effect */}
//       <div className="relative overflow-hidden">
//         <div className="bg-blue-500 h-1 w-full"></div>
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>

//         <div className="max-w-6xl mx-auto p-6">
//           <h1 className="text-4xl font-bold tracking-tight text-blue-400 mb-2">
//             PLAYER PROFILE
//           </h1>
//           <p className="text-gray-400">Manage your tournament identity</p>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="max-w-6xl mx-auto p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left side - Avatar */}
//           <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
//             <div className="flex flex-col items-center">
//               <div className="relative h-40 w-40 mb-4">
//                 <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10"></div>
//                 <img
//                   src={profile.profilePic || "/api/placeholder/200/200"}
//                   alt="Profile"
//                   className="rounded-full w-full h-full object-cover border-2 border-blue-500"
//                 />
//                 <div className="absolute -bottom-2 -right-2 bg-gray-800 p-1 rounded-full border border-blue-500">
//                   <Zap size={18} className="text-blue-400" />
//                 </div>
//               </div>

//               <h2 className="text-xl font-bold text-center mb-4">
//                 {profile.username || "PLAYER"}
//               </h2>

//               <div className="w-full">
//                 <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
//                   Profile Image URL
//                 </label>
//                 <input
//                   type="text"
//                   name="profilePic"
//                   placeholder="URL to your profile image"
//                   value={profile.profilePic}
//                   onChange={handleChange}
//                   className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Right side - Profile data */}
//           <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg">
//             <h2 className="text-xl font-bold mb-6 flex items-center">
//               <User className="mr-2 text-blue-400" /> PLAYER DETAILS
//             </h2>

//             <div className="space-y-5">
//               {/* Username field */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
//                   Username
//                 </label>
//                 <div className="relative">
//                   <User
//                     className="absolute top-3 left-3 text-gray-500"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="Enter your username"
//                     value={profile.username}
//                     onChange={handleChange}
//                     className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>

//               {/* Valorant Name field */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
//                   Valorant ID
//                 </label>
//                 <div className="relative">
//                   <Crosshair
//                     className="absolute top-3 left-3 text-gray-500"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     name="valorantName"
//                     placeholder="Enter your Valorant ID"
//                     value={profile.valorantName}
//                     onChange={handleChange}
//                     className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>

//               {/* Email field */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <Mail
//                     className="absolute top-3 left-3 text-gray-500"
//                     size={16}
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     value={profile.email}
//                     onChange={handleChange}
//                     className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>

//               {/* UPI field */}
//               <div>
//                 <label className="block text-xs font-medium text-gray-400 uppercase mb-1">
//                   UPI ID
//                 </label>
//                 <div className="relative">
//                   <Wallet
//                     className="absolute top-3 left-3 text-gray-500"
//                     size={16}
//                   />
//                   <input
//                     type="text"
//                     name="upiId"
//                     placeholder="Enter your UPI ID for prize money"
//                     value={profile.upiId}
//                     onChange={handleChange}
//                     className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>

//               {/* Update button */}
//               <div className="pt-4">
//                 <button
//                   onClick={handleUpdate}
//                   disabled={loading}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50"
//                 >
//                   {loading ? (
//                     <span className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Updating Profile...
//                     </span>
//                   ) : (
//                     <>
//                       <Check size={18} />
//                       <span>Update Profile</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { User, Zap, Crosshair, Mail, Wallet, Check } from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    valorantName: "",
    email: "",
    upiId: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/users/me");
      setProfile(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      toast.error("Failed to load profile data", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update local state on input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Submit updated profile to backend
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { username, valorantName, email, upiId, profilePic } = profile;
      await axiosInstance.put("/users/update-profile", {
        username,
        valorantName,
        email,
        upiId,
        profilePic,
      });
      toast.success("Profile updated successfully!", { theme: "dark" });
      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top header with background effect */}
      <div className="relative overflow-hidden">
        <div className="bg-red-600 h-1 w-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-rose-900 opacity-20"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/300')] opacity-10 bg-cover bg-center"></div>

        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-5xl font-bold tracking-tighter text-red-500 mb-2">
            AGENT PROFILE
          </h1>
          <p className="text-gray-400 text-lg">
            Customize your tournament identity
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side - Avatar */}
          <div className="bg-gray-900 p-6 rounded-lg border border-red-900">
            <div className="flex flex-col items-center">
              <div className="relative h-48 w-48 mb-4">
                <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 "></div>
                <img
                  src={profile.profilePic || "/api/placeholder/200/200"}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover border-4 border-red-600"
                />
                <div className="absolute -bottom-2 -right-2 bg-gray-900 p-1 rounded-full border-2 border-red-600">
                  <Zap size={20} className="text-red-500" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center mb-4">
                {profile.username || "AGENT"}
              </h2>

              <div className="w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  name="profilePic"
                  placeholder="URL to your profile image"
                  value={profile.profilePic}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Right side - Profile data */}
          <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg border border-red-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full filter blur-3xl opacity-10"></div>

            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <User className="mr-2 text-red-500" /> AGENT DETAILS
            </h2>

            <div className="space-y-5">
              {/* Username field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute top-3 left-3 text-gray-500"
                    size={16}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={profile.username}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Valorant Name field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Valorant ID
                </label>
                <div className="relative">
                  <Crosshair
                    className="absolute top-3 left-3 text-gray-500"
                    size={16}
                  />
                  <input
                    type="text"
                    name="valorantName"
                    placeholder="Enter your Valorant ID"
                    value={profile.valorantName}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute top-3 left-3 text-gray-500"
                    size={16}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* UPI field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  UPI ID
                </label>
                <div className="relative">
                  <Wallet
                    className="absolute top-3 left-3 text-gray-500"
                    size={16}
                  />
                  <input
                    type="text"
                    name="upiId"
                    placeholder="Enter your UPI ID for prize money"
                    value={profile.upiId}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded text-white focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Update button */}
              <div className="pt-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center space-x-2 transition-all duration-200 transform hover:translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      UPDATING PROFILE...
                    </span>
                  ) : (
                    <>
                      <Check size={20} />
                      <span>UPDATE PROFILE</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
