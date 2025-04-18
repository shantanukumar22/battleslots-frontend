import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

function AdminCreateTimeSlot() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!time || !date) {
      setError("Both fields are required.");
      return;
    }

    try {
      const payload = { time, date };
      const res = await axiosInstance.post("/timeslots/create", payload);
      toast.success("Time slot created successfully!");
      // Reset form after success
      setTime("");
      setDate("");
    } catch (err) {
      toast.error("Error creating time slot.");
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
      <h2 className="text-3xl font-bold">🕒 Create a Time Slot</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleCreateSlot} className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-2 p-2 w-full bg-gray-800 rounded"
          />
              </div>
              
        <div>
          <label className="block text-lg font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 p-2 w-full bg-gray-800 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 p-3 rounded font-semibold hover:bg-green-700"
        >
          Create Time Slot
        </button>
      </form>
    </div>
  );
}

export default AdminCreateTimeSlot;
