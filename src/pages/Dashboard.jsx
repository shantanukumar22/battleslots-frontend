// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me"); // Fetch user details from `/me`
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();
//   }, [user]);

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
//       <h2 className="text-4xl font-bold">
//         👋 Welcome back, {userDetails?.username}!
//       </h2>

//       {userDetails && (
//         <div className="space-y-3 text-lg">
//           <p>
//             <span className="font-semibold">Valorant Name:</span>{" "}
//             {userDetails.valorantName}
//           </p>
//           <p>
//             <span className="font-semibold">Email:</span> {userDetails.email}
//           </p>
//           <p>
//             <span className="font-semibold">Wallet Balance:</span> ₹
//             {walletBalance}
//           </p>
//         </div>
//       )}

//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold mb-4">📅 Your Booked Matches</h3>
//         {bookedSlots.length > 0 ? (
//           <ul className="space-y-3">
//             {bookedSlots.map((slot) => (
//               <li key={slot._id} className="bg-gray-800 p-4 rounded">
//                 <p className="text-lg">Time: {slot.time}</p>
//                 <p className="text-sm text-gray-400">
//                   Players: {slot.players.length}/10
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400">You haven’t booked any matches yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";
// import { Link } from "react-router-dom";
// import { FaWallet, FaGamepad, FaGift, FaPlusCircle } from "react-icons/fa";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();
//   }, [user]);

//   return (
//     <div className="p-6 bg-gray-900 text-white space-y-8">
//       <h2 className="text-3xl font-bold">
//         👋 Welcome back, {userDetails?.username}!
//       </h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaWallet className="text-3xl text-yellow-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Wallet Balance</h3>
//             <p className="text-2xl font-bold">₹{walletBalance}</p>
//           </div>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaGamepad className="text-3xl text-indigo-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Matches Played</h3>
//             <p className="text-2xl font-bold">{bookedSlots.length}</p>
//           </div>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaGift className="text-3xl text-green-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Prizes Won</h3>
//             <p className="text-2xl font-bold">₹0</p> {/* dynamic later */}
//           </div>
//         </div>
//       </div>

//       {/* Upcoming Match */}
//       <div className="bg-gray-800 p-6 rounded-xl space-y-3">
//         <h3 className="text-2xl font-bold">📅 Next Booked Match</h3>
//         {bookedSlots.length > 0 ? (
//           <div >
//             <p className="text-lg">⏰ {bookedSlots[0].time}</p>
//             <p className="text-sm text-gray-400">
//               Players Joined: {bookedSlots[0].players.length}/10
//             </p>
//             <Link
//               to={`/admin/slots/${bookedSlots[0]._id}`}
//               className="mt-3 inline-block bg-indigo-600 p-2 rounded font-semibold"
//             >
//               View Slot Details
//             </Link>
//           </div>
//         ) : (
//           <p className="text-gray-400">You haven't booked any matches yet.</p>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/book"
//           className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl space-x-3"
//         >
//           <FaGamepad />
//           <span className="font-semibold">Book Slot</span>
//         </Link>

//         <Link
//           to="/add-money"
//           className="flex items-center justify-center bg-green-600 hover:bg-green-700 p-4 rounded-xl space-x-3"
//         >
//           <FaPlusCircle />
//           <span className="font-semibold">Add Money</span>
//         </Link>

//         <Link
//           to="/transactions"
//           className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 p-4 rounded-xl space-x-3"
//         >
//           <FaWallet />
//           <span className="font-semibold">Transactions</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";
// import { Link } from "react-router-dom";
// import {
//   FaWallet,
//   FaGamepad,
//   FaGift,
//   FaPlusCircle,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   const bannerImages = [
//     "https://i.pinimg.com/736x/5b/37/3d/5b373d08aa8828f3f17b3e7a98094d45.jpg",
//     "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
//     "https://i.pinimg.com/736x/90/95/62/9095625b11bcf0ec36e4ba83464ad12d.jpg",

//     "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//   const prevSlide = () =>
//     setCurrentSlide((prev) =>
//       prev === 0 ? bannerImages.length - 1 : prev - 1
//     );

//   return (
//     <div className="p-4 md:p-6 bg-gray-900 text-white space-y-8">
//       {/* Banner Carousel */}
//       <div className="relative rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={bannerImages[currentSlide]}
//           alt="Valorant Banner"
//           className="w-full h-48 md:h-64 object-cover transition-all duration-500"
//         />
//         {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
//             Welcome to ValoPlay Tournaments!
//           </h2>
//         </div> */}

//         {/* Prev & Next buttons */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 rounded-full p-2 text-white"
//         >
//           <FaChevronRight />
//         </button>
//       </div>

//       <h2 className="text-3xl font-bold">
//         👋 Welcome back, {userDetails?.username}!
//       </h2>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaWallet className="text-3xl text-yellow-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Wallet Balance</h3>
//             <p className="text-2xl font-bold">₹{walletBalance}</p>
//           </div>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaGamepad className="text-3xl text-indigo-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Matches Played</h3>
//             <p className="text-2xl font-bold">{bookedSlots.length}</p>
//           </div>
//         </div>

//         <div className="bg-gray-800 p-6 rounded-xl flex items-center space-x-4">
//           <FaGift className="text-3xl text-green-400" />
//           <div>
//             <h3 className="text-lg font-semibold">Prizes Won</h3>
//             <p className="text-2xl font-bold">₹0</p>
//           </div>
//         </div>
//       </div>

//       {/* Upcoming Match */}
//       <div className="bg-gray-800 p-6 rounded-xl space-y-3">
//         <h3 className="text-2xl font-bold">📅 Next Booked Match</h3>
//         {bookedSlots.length > 0 ? (
//           <div>
//             <p className="text-lg">⏰ {bookedSlots[0].time}</p>
//             <p className="text-sm text-gray-400">
//               Players Joined: {bookedSlots[0].players.length}/10
//             </p>
//           </div>
//         ) : (
//           <p className="text-gray-400">You haven’t booked any matches yet.</p>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/book"
//           className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl space-x-3"
//         >
//           <FaGamepad />
//           <span className="font-semibold">Book Slot</span>
//         </Link>

//         <Link
//           to="/add-money"
//           className="flex items-center justify-center bg-green-600 hover:bg-green-700 p-4 rounded-xl space-x-3"
//         >
//           <FaPlusCircle />
//           <span className="font-semibold">Add Money</span>
//         </Link>

//         <Link
//           to="/transactions"
//           className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 p-4 rounded-xl space-x-3"
//         >
//           <FaWallet />
//           <span className="font-semibold">Transactions</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";
// import { Link } from "react-router-dom";
// import {
//   FaWallet,
//   FaGamepad,
//   FaGift,
//   FaPlusCircle,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   const bannerImages = [
//     "https://i.pinimg.com/736x/5b/37/3d/5b373d08aa8828f3f17b3e7a98094d45.jpg",
//     "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
//     "https://i.pinimg.com/736x/90/95/62/9095625b11bcf0ec36e4ba83464ad12d.jpg",
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//   const prevSlide = () =>
//     setCurrentSlide((prev) =>
//       prev === 0 ? bannerImages.length - 1 : prev - 1
//     );

//   return (
//     <div className="p-4 md:p-6 bg-gray-900 text-white space-y-8">
//       {/* Banner Carousel */}
//       <div className="relative rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={bannerImages[currentSlide]}
//           alt="Valorant Banner"
//           className="w-full h-48 md:h-64 object-cover transition-all duration-500"
//         />
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2 text-white"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2 text-white"
//         >
//           <FaChevronRight />
//         </button>
//       </div>

//       {/* Profile Card */}
//       {userDetails && (
//         <div className="bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 shadow-lg">
//           <img
//             src={
//               userDetails.profilePic ||
//               "https://api.dicebear.com/7.x/adventurer-neutral/svg"
//             }
//             alt="Profile"
//             className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
//           />
//           <div className="flex-1 space-y-2">
//             <h2 className="text-2xl font-bold">{userDetails.username}</h2>
//             <p className="text-indigo-400 text-lg">
//               🎮 {userDetails.valorantName}
//             </p>
//             <p className="text-gray-300">📧 {userDetails.email}</p>
//             <p className="text-gray-400">
//               💸 UPI: {userDetails.upiId || "N/A"}
//             </p>

//             <div className="flex space-x-4 mt-4">
//               <div className="text-center">
//                 <p className="text-xl font-bold text-yellow-400">
//                   ₹{walletBalance}
//                 </p>
//                 <span className="text-sm text-gray-400">Balance</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-indigo-400">
//                   {bookedSlots.length}
//                 </p>
//                 <span className="text-sm text-gray-400">Matches</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-green-400">₹0</p>
//                 <span className="text-sm text-gray-400">Prizes</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/book"
//           className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl space-x-3"
//         >
//           <FaGamepad />
//           <span className="font-semibold">Book Slot</span>
//         </Link>

//         <Link
//           to="/add-money"
//           className="flex items-center justify-center bg-green-600 hover:bg-green-700 p-4 rounded-xl space-x-3"
//         >
//           <FaPlusCircle />
//           <span className="font-semibold">Add Money</span>
//         </Link>

//         <Link
//           to="/transactions"
//           className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 p-4 rounded-xl space-x-3"
//         >
//           <FaWallet />
//           <span className="font-semibold">Transactions</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";
// import { Link } from "react-router-dom";
// import {
//   FaWallet,
//   FaGamepad,
//   FaGift,
//   FaPlusCircle,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   const bannerImages = [
//     "https://i.pinimg.com/736x/5b/37/3d/5b373d08aa8828f3f17b3e7a98094d45.jpg",
//     "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
//     "https://i.pinimg.com/736x/90/95/62/9095625b11bcf0ec36e4ba83464ad12d.jpg",
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//   const prevSlide = () =>
//     setCurrentSlide((prev) =>
//       prev === 0 ? bannerImages.length - 1 : prev - 1
//     );

//   return (
//     <div className="p-4 md:p-6 bg-gray-900 text-white space-y-8">
//       {/* Banner Carousel */}
//       <div className="relative rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={bannerImages[currentSlide]}
//           alt="Banner"
//           className="w-full h-48 md:h-64 object-cover transition-all duration-500"
//         />
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2"
//         >
//           <FaChevronRight />
//         </button>
//       </div>

//       {/* Profile Card */}
//       {userDetails && (
//         <div className="bg-gray-800 p-6 rounded-xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6 shadow-xl border-4 border-indigo-500">
//           <img
//             src={
//               userDetails.profilePic ||
//               "https://api.dicebear.com/7.x/adventurer-neutral/svg"
//             }
//             alt="Profile"
//             className="w-32 h-32 rounded-full border-4 border-indigo-500 object-cover shadow-lg"
//           />
//           <div className="flex-1 space-y-2">
//             <h2 className="text-3xl font-semibold text-indigo-400">
//               {userDetails.username}
//             </h2>
//             <p className="text-lg text-gray-300">
//               🎮 {userDetails.valorantName}
//             </p>
//             <p className="text-gray-400">📧 {userDetails.email}</p>
//             <p className="text-gray-400">
//               💸 UPI: {userDetails.upiId || "N/A"}
//             </p>

//             <div className="flex space-x-4 mt-4">
//               <div className="text-center">
//                 <p className="text-xl font-bold text-yellow-400">
//                   ₹{walletBalance}
//                 </p>
//                 <span className="text-sm text-gray-400">Balance</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-indigo-400">
//                   {bookedSlots.length}
//                 </p>
//                 <span className="text-sm text-gray-400">Matches</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-green-400">₹0</p>
//                 <span className="text-sm text-gray-400">Prizes</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Upcoming Booked Slots */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-bold">📅 Upcoming Booked Slots</h3>
//         {bookedSlots.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {bookedSlots.slice(0, 3).map((slot) => (
//               <div
//                 key={slot._id}
//                 className="bg-gray-800 p-4 rounded-lg space-y-2 shadow-xl"
//               >
//                 <p className="text-lg text-white">⏰ {slot.time}</p>
//                 <p className="text-sm text-gray-400">
//                   Players: {slot.players.length}/10
//                 </p>
//                 <Link
//                   to={`/admin/slots/${slot._id}`}
//                   className="mt-3 inline-block bg-indigo-600 p-2 rounded font-semibold text-white hover:bg-indigo-700"
//                 >
//                   View Slot Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">You don’t have any upcoming matches.</p>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/book"
//           className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl space-x-3"
//         >
//           <FaGamepad />
//           <span className="font-semibold">Book Slot</span>
//         </Link>

//         <Link
//           to="/add-money"
//           className="flex items-center justify-center bg-green-600 hover:bg-green-700 p-4 rounded-xl space-x-3"
//         >
//           <FaPlusCircle />
//           <span className="font-semibold">Add Money</span>
//         </Link>

//         <Link
//           to="/transactions"
//           className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 p-4 rounded-xl space-x-3"
//         >
//           <FaWallet />
//           <span className="font-semibold">Transactions</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import axiosInstance from "../utils/axiosInstance";
// import { Link } from "react-router-dom";
// import {
//   FaWallet,
//   FaGamepad,
//   FaGift,
//   FaPlusCircle,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// function Dashboard() {
//   const { user } = useContext(AuthContext);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookedSlots, setBookedSlots] = useState([]);

//   const bannerImages = [
//     "https://i.pinimg.com/736x/5b/37/3d/5b373d08aa8828f3f17b3e7a98094d45.jpg",
//     "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
//     "https://i.pinimg.com/736x/90/95/62/9095625b11bcf0ec36e4ba83464ad12d.jpg",
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         const res = await axiosInstance.get("/wallet/balance");
//         setWalletBalance(res.data.balance);
//       } catch (err) {
//         console.log("Error fetching wallet balance:", err);
//       }
//     };

//     const fetchUserDetails = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         setUserDetails(res.data);
//       } catch (err) {
//         console.log("Error fetching user details:", err);
//       }
//     };

//     const fetchBookedSlots = async () => {
//       try {
//         const res = await axiosInstance.get("/timeslots/my-slots");
//         setBookedSlots(res.data);
//       } catch (err) {
//         console.log("Error fetching booked slots:", err);
//       }
//     };

//     fetchWalletBalance();
//     fetchUserDetails();
//     fetchBookedSlots();

//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const nextSlide = () =>
//     setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
//   const prevSlide = () =>
//     setCurrentSlide((prev) =>
//       prev === 0 ? bannerImages.length - 1 : prev - 1
//     );

//   return (
//     <div className="p-4 md:p-6 bg-black text-white space-y-8">
//       {/* Banner Carousel */}
//       <div className="relative rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={bannerImages[currentSlide]}
//           alt="Valorant Banner"
//           className="w-full h-48 md:h-64 object-cover transition-all duration-500"
//         />
//         <button
//           onClick={prevSlide}
//           className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-800 bg-opacity-60 rounded-full p-2"
//         >
//           <FaChevronLeft />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-60 rounded-full p-2"
//         >
//           <FaChevronRight />
//         </button>
//       </div>

//       {/* Profile Section */}
//       {userDetails && (
//         <div className="flex flex-col md:flex-row items-center bg-gray-800 p-6 rounded-xl shadow-lg space-y-6 md:space-y-0 md:space-x-8">
//           {/* Profile Picture */}
//           <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
//             <img
//               src={
//                 userDetails.profilePic ||
//                 "https://api.dicebear.com/7.x/adventurer-neutral/svg"
//               }
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* User Details */}
//           <div className="space-y-2 text-center md:text-left">
//             <h2 className="text-2xl font-bold text-indigo-400">
//               {userDetails.username}
//             </h2>
//             <p className="text-lg text-gray-300">
//               🎮 {userDetails.valorantName}
//             </p>
//             <p className="text-gray-400">📧 {userDetails.email}</p>
//             <p className="text-gray-400">
//               💸 UPI: {userDetails.upiId || "N/A"}
//             </p>

//             {/* Balance, Matches, Prizes */}
//             <div className="flex justify-center md:justify-start space-x-8 mt-4">
//               <div className="text-center">
//                 <p className="text-xl font-bold text-yellow-400">
//                   ₹{walletBalance}
//                 </p>
//                 <span className="text-sm text-gray-400">Balance</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-indigo-400">
//                   {bookedSlots.length}
//                 </p>
//                 <span className="text-sm text-gray-400">Matches</span>
//               </div>
//               <div className="text-center">
//                 <p className="text-xl font-bold text-green-400">₹0</p>
//                 <span className="text-sm text-gray-400">Prizes</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Upcoming Booked Slots */}
//       <div className="space-y-4">
//         <h3 className="text-2xl font-bold">📅 Upcoming Booked Slots</h3>
//         {bookedSlots.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {bookedSlots.slice(0, 3).map((slot) => (
//               <div
//                 key={slot._id}
//                 className="bg-gray-800 p-4 rounded-lg space-y-2 shadow-xl hover:shadow-2xl transition-all duration-300"
//               >
//                 <p className="text-lg text-white">⏰ {slot.time}</p>
//                 <p className="text-sm text-gray-400">
//                   Players: {slot.players.length}/10
//                 </p>
//                 <Link
//                   to={`/admin/slots/${slot._id}`}
//                   className="mt-3 inline-block bg-indigo-600 p-2 rounded font-semibold text-white hover:bg-indigo-700"
//                 >
//                   View Slot Details
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-400">You don’t have any upcoming matches.</p>
//         )}
//       </div>

//       {/* Quick Actions */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Link
//           to="/book"
//           className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 p-4 rounded-xl space-x-3"
//         >
//           <FaGamepad />
//           <span className="font-semibold">Book Slot</span>
//         </Link>

//         <Link
//           to="/add-money"
//           className="flex items-center justify-center bg-green-600 hover:bg-green-700 p-4 rounded-xl space-x-3"
//         >
//           <FaPlusCircle />
//           <span className="font-semibold">Add Money</span>
//         </Link>

//         <Link
//           to="/transactions"
//           className="flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 p-4 rounded-xl space-x-3"
//         >
//           <FaWallet />
//           <span className="font-semibold">Transactions</span>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import {
  FaWallet,
  FaGamepad,
  FaTrophy,
  FaPlusCircle,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaUserCircle,
  FaRegClock,
  FaUsers,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const bannerImages = [
    "https://i.pinimg.com/736x/5b/37/3d/5b373d08aa8828f3f17b3e7a98094d45.jpg",
    "https://i.pinimg.com/736x/8d/79/ea/8d79ea25e29ebc75b7b90f3ad84f7acb.jpg",
    "https://i.pinimg.com/736x/90/95/62/9095625b11bcf0ec36e4ba83464ad12d.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [walletRes, userRes, slotsRes] = await Promise.all([
          axiosInstance.get("/wallet/balance"),
          axiosInstance.get("/users/me"),
          axiosInstance.get("/timeslots/my-slots"),
        ]);

        setWalletBalance(walletRes.data.balance);
        setUserDetails(userRes.data);
        setBookedSlots(slotsRes.data);
      } catch (err) {
        console.log("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1
    );

  // Format date for better display
  // Format date for better display - with error handling

  const formatDateTime = (date, time) => {
    const matchDate = new Date(date);
    const [hours, minutes] = time.split(":");

    matchDate.setHours(hours);
    matchDate.setMinutes(minutes);

    return matchDate.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-indigo-400 font-semibold">
            Loading your gaming hub...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-gray-900 to-black text-white space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
          Welcome back, {userDetails?.username || "Gamer"}!
        </h1>
        <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-50 px-4 py-2 rounded-full mt-4 md:mt-0">
          <FaCalendarAlt className="text-indigo-400" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg group">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
        <img
          src={bannerImages[currentSlide]}
          alt="Valorant Banner"
          className="w-full h-64 md:h-80 object-cover transition-all duration-1000 transform group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            ValoPlay Tournament
          </h2>
          <p className="text-gray-200 drop-shadow-md">
            Join our exclusive gaming sessions and win exciting prizes!
          </p>
          <Link
            to="/book"
            className="mt-4 inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 transform hover:translate-x-1"
          >
            Book Now <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 text-white transition-all duration-300 z-20 opacity-70 hover:opacity-100"
        >
          <FaChevronLeft size={18} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 text-white transition-all duration-300 z-20 opacity-70 hover:opacity-100"
        >
          <FaChevronRight size={18} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-6 bg-indigo-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dashboard Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        {userDetails && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <div className="relative px-6 pb-6">
              <div className="absolute -top-12 left-6 w-24 h-24 rounded-xl overflow-hidden border-4 border-gray-800 shadow-xl">
                <img
                  src={
                    userDetails.profilePic ||
                    "https://api.dicebear.com/7.x/adventurer-neutral/svg"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-14">
                <h3 className="text-2xl font-bold text-white">
                  {userDetails.username}
                </h3>
                <p className="text-indigo-400 flex items-center mt-1">
                  <FaGamepad className="mr-2" /> {userDetails.valorantName}
                </p>
                <p className="text-gray-400 mt-3 text-sm">
                  {userDetails.email}
                </p>
                <p className="text-gray-400 text-sm flex items-center">
                  <FaWallet className="mr-2" /> UPI:{" "}
                  {userDetails.upiId || "Not set"}
                </p>

                <Link
                  to="/profile"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                >
                  Edit Profile <FaArrowRight className="ml-1 text-xs" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6">
          {/* Wallet Balance */}
          <div className="bg-gradient-to-br from-emerald-900 to-green-900 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-emerald-700 bg-opacity-30 rounded-xl">
              <FaWallet size={24} className="text-emerald-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-300 text-sm">Current Balance</p>
              <h3 className="text-2xl font-bold text-white">
                ₹{walletBalance.toFixed(2)}
              </h3>
            </div>
            <Link
              to="/add-money"
              className="ml-auto bg-emerald-600 hover:bg-emerald-700 rounded-lg p-2"
            >
              <FaPlusCircle size={18} />
            </Link>
          </div>

          {/* Matches */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-indigo-700 bg-opacity-30 rounded-xl">
              <FaGamepad size={24} className="text-indigo-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-300 text-sm">Total Matches</p>
              <h3 className="text-2xl font-bold text-white">
                {bookedSlots.length}
              </h3>
            </div>
            <Link
              to="/transactions"
              className="ml-auto bg-indigo-600 hover:bg-indigo-700 rounded-lg p-2"
            >
              <FaArrowRight size={18} />
            </Link>
          </div>

          {/* Prizes */}
          <div className="bg-gradient-to-br from-yellow-800 to-amber-900 p-6 rounded-2xl shadow-xl flex items-center">
            <div className="p-4 bg-yellow-700 bg-opacity-30 rounded-xl">
              <FaTrophy size={24} className="text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-gray-300 text-sm">Prizes Won</p>
              <h3 className="text-2xl font-bold text-white">₹0.00</h3>
            </div>
            <div className="ml-auto bg-yellow-600 hover:bg-yellow-700 rounded-lg p-2">
              <FaBolt size={18} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <FaBolt className="text-indigo-400 mr-2" /> Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/book"
              className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 p-4 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center">
                <FaGamepad className="mr-3" />
                <span className="font-medium">Book Slot</span>
              </div>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/add-money"
              className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 p-4 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center">
                <FaPlusCircle className="mr-3" />
                <span className="font-medium">Add Money</span>
              </div>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/transactions"
              className="flex items-center justify-between bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 p-4 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center">
                <FaWallet className="mr-3" />
                <span className="font-medium">Transactions</span>
              </div>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/request-payout"
              className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 p-4 rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center">
                <FaWallet className="mr-3" />
                <span className="font-medium">Request Payout</span>
              </div>
              <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Booked Slots */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold flex items-center">
            <FaCalendarAlt className="text-indigo-400 mr-2" /> Upcoming Matches
          </h3>
          {bookedSlots.length > 3 && (
            <Link
              to="/book"
              className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
            >
              View all <FaArrowRight className="ml-1" />
            </Link>
          )}
        </div>

        {bookedSlots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookedSlots
              .slice()
              .reverse()
              .slice(0, 10)
              .map((slot) => (
                <div
                  key={slot._id}
                  className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <FaRegClock className="mr-2" />
                      <span className="font-medium">
                        {formatDateTime(slot.date, slot.time)}
                      </span>{" "}
                    </div>
                    <span className="bg-indigo-900 py-1 px-2 rounded-full text-xs">
                      {new Date(slot.date + "T" + slot.time) > new Date()
                        ? "Upcoming"
                        : "Active"}
                    </span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FaUsers className="mr-2 text-indigo-400" />
                      <span>{slot.players.length}/10 Players Joined</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{
                          width: `${(slot.players.length / 10) * 100}%`,
                        }}
                      ></div>
                    </div>
                    {/* Show Room Code if it exists */}
                    {slot.roomCode && (
                      <div className="text-center text-sm text-gray-400 mt-2">
                        <p>
                          Room Code:{" "}
                          <span className="font-semibold text-indigo-400">
                            {slot.roomCode}
                          </span>
                        </p>
                      </div>
                    )}
                    <Link
                      to={`/admin/slots/${slot._id}`}
                      className="mt-3 inline-block w-full bg-gray-700 hover:bg-indigo-600 p-2 rounded-lg font-medium text-center transition-colors duration-300 group-hover:bg-indigo-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-gray-800 bg-opacity-40 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
              <FaCalendarAlt size={24} className="text-gray-400" />
            </div>
            <h4 className="text-xl font-medium text-gray-300">
              No Upcoming Matches
            </h4>
            <p className="text-gray-500 mt-2">
              You don't have any upcoming matches scheduled.
            </p>
            <Link
              to="/book"
              className="mt-6 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Book Your First Slot <FaArrowRight className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

// <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
// <div className="flex justify-between items-center mb-6">
//   <h3 className="text-2xl font-bold flex items-center">
//     <FaCalendarAlt className="text-indigo-400 mr-2" /> Upcoming Matches
//   </h3>
//   {bookedSlots.length > 3 && (
//     <Link
//       to="/book"
//       className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
//     >
//       View all <FaArrowRight className="ml-1" />
//     </Link>
//   )}
// </div>

// {bookedSlots.length > 0 ? (
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     {bookedSlots.slice(0, 3).map((slot) => (
//       <div
//         key={slot._id}
//         className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
//       >
//         <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 flex justify-between items-center">
//           <div className="flex items-center">
//             <FaRegClock className="mr-2" />
//             <span className="font-medium">
//               {formatDateTime(slot.date, slot.time)}
//             </span>
//           </div>

//           <span className="bg-indigo-900 py-1 px-2 rounded-full text-xs">
//             {new Date(slot.date + "T" + slot.time) > new Date()
//               ? "Upcoming"
//               : "Active"}
//           </span>
//         </div>

//         <div className="p-4 space-y-3">
//           <div className="flex items-center text-gray-300">
//             <FaUsers className="mr-2 text-indigo-400" />
//             <span>{slot.players.length}/10 Players Joined</span>
//           </div>

//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div
//               className="bg-indigo-500 h-2 rounded-full"
//               style={{
//                 width: `${(slot.players.length / 10) * 100}%`,
//               }}
//             ></div>
//           </div>

//           {/* Show Room Code if it exists */}
//           {slot.roomCode && (
//             <div className="text-center text-sm text-gray-400 mt-2">
//               <p>
//                 Room Code:{" "}
//                 <span className="font-semibold text-indigo-400">
//                   {slot.roomCode}
//                 </span>
//               </p>
//             </div>
//           )}

//           <Link
//             to={`/admin/slots/${slot._id}`}
//             className="mt-3 inline-block w-full bg-gray-700 hover:bg-indigo-600 p-2 rounded-lg font-medium text-center transition-colors duration-300 group-hover:bg-indigo-600"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <div className="bg-gray-800 bg-opacity-40 rounded-xl p-8 text-center">
//     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
//       <FaCalendarAlt size={24} className="text-gray-400" />
//     </div>
//     <h4 className="text-xl font-medium text-gray-300">
//       No Upcoming Matches
//     </h4>
//     <p className="text-gray-500 mt-2">
//       You don't have any upcoming matches scheduled.
//     </p>
//     <Link
//       to="/book"
//       className="mt-6 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
//     >
//       Book Your First Slot <FaArrowRight className="ml-2" />
//     </Link>
//   </div>
// )}
// </div>
// </div>

// ! bookslot
{
  /* Upcoming Booked Slots */
}
//  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6">
//  <div className="flex justify-between items-center mb-6">
//    <h3 className="text-2xl font-bold flex items-center">
//      <FaCalendarAlt className="text-indigo-400 mr-2" /> Upcoming Matches
//    </h3>
//    {bookedSlots.length > 3 && (
//      <Link
//        to="/book"
//        className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium"
//      >
//        View all <FaArrowRight className="ml-1" />
//      </Link>
//    )}
//  </div>

//  {bookedSlots.length > 0 ? (
//    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//      {bookedSlots.slice(0, 3).map((slot) => (
//        <div
//          key={slot._id}
//          className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
//        >
//          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-3 flex justify-between items-center">
//            <div className="flex items-center">
//              <FaRegClock className="mr-2" />
//              <span className="font-medium">{formatDate(slot.time)}</span>
//            </div>
//            <span className="bg-indigo-900 py-1 px-2 rounded-full text-xs">
//              {new Date(slot.time) > new Date() ? "Upcoming" : "Active"}
//            </span>
//          </div>

//          <div className="p-4 space-y-3">
//            <div className="flex items-center text-gray-300">
//              <FaUsers className="mr-2 text-indigo-400" />
//              <span>{slot.players.length}/10 Players Joined</span>
//            </div>

//            <div className="w-full bg-gray-700 rounded-full h-2">
//              <div
//                className="bg-indigo-500 h-2 rounded-full"
//                style={{ width: `${(slot.players.length / 10) * 100}%` }}
//              ></div>
//            </div>

//            {/* Show Room Code if it exists */}
//            {slot.roomCode && (
//              <div className="text-center text-sm text-gray-400 mt-2">
//                <p>
//                  Room Code:{" "}
//                  <span className="font-semibold text-indigo-400">
//                    {slot.roomCode}
//                  </span>
//                </p>
//              </div>
//            )}

//            <Link
//              to={`/admin/slots/${slot._id}`}
//              className="mt-3 inline-block w-full bg-gray-700 hover:bg-indigo-600 p-2 rounded-lg font-medium text-center transition-colors duration-300 group-hover:bg-indigo-600"
//            >
//              View Details
//            </Link>
//          </div>
//        </div>
//      ))}
//    </div>
//  ) : (
//    <div className="bg-gray-800 bg-opacity-40 rounded-xl p-8 text-center">
//      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
//        <FaCalendarAlt size={24} className="text-gray-400" />
//      </div>
//      <h4 className="text-xl font-medium text-gray-300">
//        No Upcoming Matches
//      </h4>
//      <p className="text-gray-500 mt-2">
//        You don't have any upcoming matches scheduled.
//      </p>
//      <Link
//        to="/book"
//        className="mt-6 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
//      >
//        Book Your First Slot <FaArrowRight className="ml-2" />
//      </Link>
//    </div>
//  )}
// </div>
// </div>
