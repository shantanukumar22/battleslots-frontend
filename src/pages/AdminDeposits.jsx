import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

function AdminDeposits() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("/payments/requests");
      setRequests(res.data.reverse());
    } catch (err) {
      toast.error("Failed to load deposit requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/payments/approve/${id}`);
      toast.success("Deposit approved and wallet updated");
      fetchRequests();
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.put(`/payments/reject/${id}`);
      toast.success("Deposit rejected");
      fetchRequests();
    } catch (err) {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-4">📥 Manual Deposit Requests</h2>
      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="bg-gray-800 p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">User: {req.user.username}</p>
                <p>Email: {req.user.email}</p>
                <p>Amount: ₹{req.amount}</p>
                <p>Status: {req.status}</p>
              </div>
              {req.status === "pending" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(req._id)}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(req._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No deposit requests at the moment.</p>
      )}
    </div>
  );
}

export default AdminDeposits;
