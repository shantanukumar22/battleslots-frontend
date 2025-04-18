import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

function AdminSlotDetails() {
  const { slotId } = useParams();
  const [slot, setSlot] = useState(null);
  const [prizes, setPrizes] = useState([]);

  const fetchSlotDetails = async () => {
    try {
      const res = await axiosInstance.get(`/timeslots`);
      const foundSlot = res.data.find((s) => s._id === slotId);
      setSlot(foundSlot);

      // Initialize prizes state
      if (foundSlot) {
        setPrizes(
          foundSlot.players.map((player) => ({
            userId: player._id,
            amount: 0,
          }))
        );
      }
    } catch (err) {
      console.error("Error fetching slot details:", err);
    }
  };

  useEffect(() => {
    fetchSlotDetails();
  }, [slotId]);

  const handlePrizeChange = (userId, value) => {
    setPrizes((prev) =>
      prev.map((prize) =>
        prize.userId === userId ? { ...prize, amount: Number(value) } : prize
      )
    );
  };

  const handleDeclareResults = async () => {
    try {
      await axiosInstance.put(`/timeslots/declare-results/${slotId}`, {
        prizes,
      });
      toast.success("Prizes distributed successfully!");
      fetchSlotDetails(); // Refresh balance info
    } catch (err) {
      toast.error("Failed to distribute prizes");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
      {slot ? (
        <>
          <h2 className="text-3xl font-bold">
            📅 {slot.time} on {new Date(slot.date).toLocaleDateString()}
          </h2>
          <h3 className="text-2xl">Players in this match:</h3>

          {slot.players.length > 0 ? (
            <ul className="space-y-2">
              {slot.players.map((player) => (
                <li
                  key={player._id}
                  className="bg-gray-800 p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{player.username}</p>
                    <p className="text-sm text-gray-400">
                      Valorant: {player.valorantName}
                    </p>
                    <p className="text-sm text-gray-400">
                      Email: {player.email}
                    </p>
                    <p className="text-sm text-gray-400">
                      Wallet: ₹{player.walletBalance}
                    </p>
                  </div>

                  <input
                    type="number"
                    placeholder="Prize ₹"
                    className="p-2 w-24 rounded bg-gray-700 text-white"
                    value={
                      prizes.find((pr) => pr.userId === player._id)?.amount ||
                      ""
                    }
                    onChange={(e) =>
                      handlePrizeChange(player._id, e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No players booked in this slot yet.</p>
          )}

          <button
            onClick={handleDeclareResults}
            className="bg-green-600 p-3 w-full rounded font-semibold hover:bg-green-700 mt-4"
          >
            ✅ Declare Match Results & Credit Prizes
          </button>
        </>
      ) : (
        <p>Loading slot details...</p>
      )}
    </div>
  );
}

export default AdminSlotDetails;
