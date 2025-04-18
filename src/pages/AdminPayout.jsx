import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";

function AdminPayouts() {
  const [payouts, setPayouts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPayouts = async () => {
    try {
      const res = await axiosInstance.get(`/payout?page=${page}&limit=9`);
      setPayouts(res.data.payouts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching payouts:", err);
      toast.error("Failed to fetch payouts");
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, [page]);

  const handleApprove = async (payoutId) => {
    try {
      await axiosInstance.put(`/payout/approve/${payoutId}`);
      toast.success("Payout approved!");
      fetchPayouts();
    } catch (err) {
      toast.error("Failed to approve payout");
    }
  };

  const handleReject = async (payoutId) => {
    try {
      await axiosInstance.put(`/payout/reject/${payoutId}`);
      toast.success("Payout rejected.");
      fetchPayouts();
    } catch (err) {
      toast.error("Failed to reject payout");
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md text-white space-y-6">
      <h2 className="text-3xl font-bold">💸 Payout Requests</h2>

      {payouts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {payouts.map((payout) => (
            <div
              key={payout._id}
              className="bg-gray-800 p-5 rounded-xl flex flex-col justify-between shadow-lg border border-gray-700"
            >
              <div>
                <h3 className="text-lg font-bold mb-2">
                  {payout.user.username}
                </h3>
                <p className="text-sm text-gray-400">{payout.user.email}</p>
                <p className="text-sm mt-1">UPI: {payout.user.upiId}</p>
                <p className="text-sm mt-1">Amount: ₹{payout.amount}</p>
                <p className="text-sm mt-1 text-gray-400">
                  {new Date(payout.createdAt).toLocaleString()}
                </p>
                <span
                  className={`inline-block text-xs mt-2 px-2 py-1 rounded font-semibold ${
                    payout.status === "pending"
                      ? "bg-yellow-500 text-black"
                      : payout.status === "approved"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {payout.status.toUpperCase()}
                </span>
              </div>

              {payout.status === "pending" && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleApprove(payout._id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded font-semibold text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(payout._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded font-semibold text-sm"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No payout requests yet.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-3">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded ${
            page === 1
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Prev
        </button>
        <span className="text-white font-semibold">
          Page {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded ${
            page === totalPages
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AdminPayouts;
