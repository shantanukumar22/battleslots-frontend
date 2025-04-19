// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// function AdminManageTimeSlots() {
//   const [timeSlots, setTimeSlots] = useState([]);

//   const fetchTimeSlots = async () => {
//     try {
//       const res = await axiosInstance.get("/timeslots");
//       setTimeSlots(res.data);
//     } catch (err) {
//       console.log("Error fetching time slots:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTimeSlots();
//   }, []);

//   const handleDeleteSlot = async (slotId) => {
//     if (!window.confirm("Are you sure you want to delete this slot?")) return;

//     try {
//       await axiosInstance.delete(`/timeslots/delete/${slotId}`);
//       toast.success("Time slot deleted!");
//       fetchTimeSlots();
//     } catch (err) {
//       toast.error("Error deleting time slot.");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
//       <h2 className="text-3xl font-bold">📅 Manage Time Slots</h2>

//       {timeSlots.length > 0 ? (
//         <ul className="space-y-4">
//           {timeSlots.map((slot) => (
//             <li
//               key={slot._id}
//               className="bg-gray-800 p-4 rounded flex justify-between items-center"
//             >
//               <Link
//                 to={`/admin/slots/${slot._id}`}
//                 className="text-lg font-semibold hover:underline"
//               >
//                 🕒 {slot.time} on {new Date(slot.date).toLocaleDateString()}
//               </Link>

//               <button
//                 onClick={() => handleDeleteSlot(slot._id)}
//                 className="bg-red-600 p-2 rounded font-semibold hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No time slots available.</p>
//       )}
//     </div>
//   );
// }

// export default AdminManageTimeSlots;

// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// function AdminManageTimeSlots() {
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [roomCodes, setRoomCodes] = useState({}); // To hold each slot's input value

//   const fetchTimeSlots = async () => {
//     try {
//       const res = await axiosInstance.get("/timeslots");
//       setTimeSlots(res.data);
//     } catch (err) {
//       console.log("Error fetching time slots:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTimeSlots();
//   }, []);

//   const handleDeleteSlot = async (slotId) => {
//     if (!window.confirm("Are you sure you want to delete this slot?")) return;

//     try {
//       await axiosInstance.delete(`/timeslots/delete/${slotId}`);
//       toast.success("Time slot deleted!");
//       fetchTimeSlots();
//     } catch (err) {
//       toast.error("Error deleting time slot.");
//     }
//   };

//   const handleSetRoomCode = async (slotId) => {
//     const code = roomCodes[slotId];
//     if (!code) return toast.error("Enter a room code first!");

//     try {
//       await axiosInstance.put(`/timeslots/set-room-code/${slotId}`, {
//         roomCode: code,
//       });
//       toast.success("Room code set!");
//       fetchTimeSlots();
//     } catch (err) {
//       toast.error("Failed to set room code.");
//     }
//   };

//   const handleInputChange = (slotId, value) => {
//     setRoomCodes((prev) => ({ ...prev, [slotId]: value }));
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
//       <h2 className="text-3xl font-bold">📅 Manage Time Slots</h2>

//       {timeSlots.length > 0 ? (
//         <ul className="space-y-4">
//           {timeSlots.map((slot) => (
//             <li
//               key={slot._id}
//               className="bg-gray-800 p-4 rounded flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0"
//             >
//               <div>
//                 <Link
//                   to={`/admin/slots/${slot._id}`}
//                   className="text-lg font-semibold hover:underline"
//                 >
//                   🕒 {slot.time}
//                 </Link>
//                 <p className="text-gray-400 text-sm">
//                   Room Code: {slot.roomCode || "Not set"}
//                 </p>
//               </div>

//               <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Room Code"
//                   value={roomCodes[slot._id] || ""}
//                   onChange={(e) => handleInputChange(slot._id, e.target.value)}
//                   className="p-2 rounded bg-gray-700 text-white"
//                 />
//                 <button
//                   onClick={() => handleSetRoomCode(slot._id)}
//                   className="bg-indigo-600 p-2 rounded hover:bg-indigo-700 font-semibold"
//                 >
//                   Set Room Code
//                 </button>
//                 <button
//                   onClick={() => handleDeleteSlot(slot._id)}
//                   className="bg-red-600 p-2 rounded font-semibold hover:bg-red-700"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No time slots available.</p>
//       )}
//     </div>
//   );
// }

// export default AdminManageTimeSlots;
import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegClock, FaCalendarAlt } from "react-icons/fa";

function AdminManageTimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [roomCodes, setRoomCodes] = useState({});

  const fetchTimeSlots = async () => {
    try {
      const res = await axiosInstance.get("/timeslots");
      setTimeSlots(res.data);
    } catch (err) {
      console.log("Error fetching time slots:", err);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) return;
    try {
      await axiosInstance.delete(`/timeslots/delete/${slotId}`);
      toast.success("Time slot deleted!");
      fetchTimeSlots();
    } catch (err) {
      toast.error("Error deleting time slot.");
    }
  };

  const handleSetRoomCode = async (slotId) => {
    const code = roomCodes[slotId];
    if (!code) return toast.error("Enter a room code first!");
    try {
      await axiosInstance.put(`/timeslots/set-room-code/${slotId}`, {
        roomCode: code,
      });
      toast.success("Room code set!");
      fetchTimeSlots();
    } catch (err) {
      toast.error("Failed to set room code.");
    }
  };

  const handleInputChange = (slotId, value) => {
    setRoomCodes((prev) => ({ ...prev, [slotId]: value }));
  };

  // Date formatter
  const formatDateTime = (date, time) => {
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return `${formattedDate} | ${time}`;
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
      <h2 className="text-3xl font-bold mb-4">📅 Manage Time Slots</h2>

      {timeSlots.length > 0 ? (
        <ul className="space-y-5">
          {timeSlots.map((slot) => (
            <li
              key={slot._id}
              className="bg-gray-800 p-5 rounded-xl shadow flex flex-col space-y-4"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <Link
                    to={`/admin/slots/${slot._id}`}
                    className="text-lg font-semibold text-indigo-400 hover:underline"
                  >
                    🕹️ Slot for {formatDateTime(slot.date, slot.time)}
                  </Link>
                  <p className="text-gray-400 mt-1 text-sm flex items-center">
                    <FaCalendarAlt className="mr-2" />
                    Date: {new Date(slot.date).toLocaleDateString("en-IN")}
                    <FaRegClock className="ml-4 mr-2" />
                    Time: {slot.time}
                  </p>
                  <p className="text-gray-400 mt-1 text-sm">
                    Room Code:{" "}
                    <span className="font-medium text-indigo-300">
                      {slot.roomCode || "Not Set"}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleDeleteSlot(slot._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm font-semibold"
                  >
                    ❌ Delete Slot
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Room Code"
                  value={roomCodes[slot._id] || ""}
                  onChange={(e) => handleInputChange(slot._id, e.target.value)}
                  className="flex-1 p-3 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={() => handleSetRoomCode(slot._id)}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded font-semibold"
                >
                  🎮 Set Room Code
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No time slots available.</p>
      )}
    </div>
  );
}

export default AdminManageTimeSlots;
