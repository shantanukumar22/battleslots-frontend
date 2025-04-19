import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [page, setPage] = useState(1);

  const fetchLeaderboard = async (pageNo = 1) => {
    try {
      const res = await axiosInstance.get(`/leaderboard?page=${pageNo}`);
      setLeaders(res.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }  
  };

  useEffect(() => {
    fetchLeaderboard(page);
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white space-y-6">
      <h2 className="text-4xl font-bold mb-6 text-indigo-400">
        🏆 Leaderboard
      </h2>

      <div className="space-y-4">
        {leaders.length > 0 ? (
          leaders.map((leader, index) => (
            <div
              key={leader.userId}
              className="bg-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{leader.username}</h3>
                <p className="text-gray-400 text-sm">
                  🎮 {leader.valorantName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-indigo-400 font-bold text-lg">
                  ₹{leader.totalPrizes}
                </p>
                <p className="text-gray-500 text-sm">{leader.wins} Wins</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No prize winners yet.</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-gray-700 px-4 py-2 rounded flex items-center disabled:opacity-50"
        >
          <ArrowLeft className="mr-1" size={16} /> Prev
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-gray-700 px-4 py-2 rounded flex items-center"
        >
          Next <ArrowRight className="ml-1" size={16} />
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
