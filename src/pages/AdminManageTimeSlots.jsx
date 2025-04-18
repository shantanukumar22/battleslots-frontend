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

import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function AdminManageTimeSlots() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [roomCodes, setRoomCodes] = useState({}); // To hold each slot's input value

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

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
      <h2 className="text-3xl font-bold">📅 Manage Time Slots</h2>

      {timeSlots.length > 0 ? (
        <ul className="space-y-4">
          {timeSlots.map((slot) => (
            <li
              key={slot._id}
              className="bg-gray-800 p-4 rounded flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0"
            >
              <div>
                <Link
                  to={`/admin/slots/${slot._id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  🕒 {slot.time}
                </Link>
                <p className="text-gray-400 text-sm">
                  Room Code: {slot.roomCode || "Not set"}
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                <input
                  type="text"
                  placeholder="Enter Room Code"
                  value={roomCodes[slot._id] || ""}
                  onChange={(e) => handleInputChange(slot._id, e.target.value)}
                  className="p-2 rounded bg-gray-700 text-white"
                />
                <button
                  onClick={() => handleSetRoomCode(slot._id)}
                  className="bg-indigo-600 p-2 rounded hover:bg-indigo-700 font-semibold"
                >
                  Set Room Code
                </button>
                <button
                  onClick={() => handleDeleteSlot(slot._id)}
                  className="bg-red-600 p-2 rounded font-semibold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No time slots available.</p>
      )}
    </div>
  );
}

export default AdminManageTimeSlots;
