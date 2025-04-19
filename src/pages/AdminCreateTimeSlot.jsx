// import { useState } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";

// function AdminCreateTimeSlot() {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");
//   const [error, setError] = useState("");

//   const handleCreateSlot = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!time || !date) {
//       setError("Both fields are required.");
//       return;
//     }

//     try {
//       const payload = { time, date };
//       const res = await axiosInstance.post("/timeslots/create", payload);
//       toast.success("Time slot created successfully!");
//       // Reset form after success
//       setTime("");
//       setDate("");
//     } catch (err) {
//       toast.error("Error creating time slot.");
//       console.log(err);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
//       <h2 className="text-3xl font-bold">🕒 Create a Time Slot</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <form onSubmit={handleCreateSlot} className="space-y-4">
//         <div>
//           <label className="block text-lg font-medium">Time</label>
//           <input
//             type="time"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="mt-2 p-2 w-full bg-gray-800 rounded"
//           />
//               </div>

//         <div>
//           <label className="block text-lg font-medium">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-2 p-2 w-full bg-gray-800 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-600 p-3 rounded font-semibold hover:bg-green-700"
//         >
//           Create Time Slot
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminCreateTimeSlot;
import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

function AdminCreateTimeSlot() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setError("");

    if (!time || !date) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const payload = { time, date };
      await axiosInstance.post("/timeslots/create", payload);
      toast.success("Time slot created successfully!");
      setTime("");
      setDate("");
    } catch (err) {
      toast.error("Error creating time slot.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl text-white space-y-6">
      <h2 className="text-3xl font-bold">🕒 Create a New Time Slot</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleCreateSlot} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
            placeholder="HH:MM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-green-500 outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          {loading ? "Creating..." : "Create Time Slot"}
        </button>
      </form>
    </div>
  );
}

export default AdminCreateTimeSlot;
