// import { useState, useEffect } from "react";
// import axios from "axios";

// function Transactions() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/transactions/my",
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setTransactions(res.data);
//       } catch (err) {
//         console.log("Error fetching transactions:", err);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md">
//       <h2 className="text-white text-3xl mb-4">Your Transactions</h2>
//       <div className="bg-gray-800 p-6 rounded-md">
//         {transactions.length > 0 ? (
//           <ul>
//             {transactions.map((txn) => (
//               <li key={txn._id} className="text-white">
//                 <p>
//                   {txn.type}: ₹{txn.amount}
//                 </p>
//                 <p>Status: {txn.status}</p>
//                 <hr className="my-2" />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-white">No transactions yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Transactions;

import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Wallet,
  Trophy,
  Calendar,
  Search,
  RefreshCw,
  Filter,
} from "lucide-react";
import axiosInstance from "../utils/AxiosInstance";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/transactions/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTransactions(res.data);
    } catch (err) {
      console.log("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Get transaction type icon based on type
  const getTransactionTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return <ArrowDownCircle className="text-green-400" size={24} />;
      case "payout":
        return <ArrowUpCircle className="text-red-400" size={24} />;
      case "booking":
        return <Calendar className="text-blue-400" size={24} />;
      case "prize":
        return <Trophy className="text-yellow-400" size={24} />;
      default:
        return <Wallet className="text-purple-400" size={24} />;
    }
  };

  // Get transaction status badge based on status
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "success":
        return (
          <span className="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle2 size={14} />
            {status}
          </span>
        );
      case "pending":
      case "processing":
        return (
          <span className="px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock size={14} />
            {status}
          </span>
        );
      case "failed":
      case "cancelled":
        return (
          <span className="px-3 py-1 bg-red-900/50 text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle size={14} />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((txn) => {
    const matchesFilter =
      filter === "all" || txn.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      txn.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (txn.description &&
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with summary cards */}
        <div className="mb-8">
          <h2 className="text-white text-3xl font-bold mb-6 flex items-center">
            <Wallet className="mr-3 text-blue-400" size={28} />
            Transaction History
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Total Balance Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-white">
                ₹
                {transactions
                  .reduce((total, txn) => {
                    if (txn.type === "deposit" || txn.type === "prize") {
                      return total + txn.amount;
                    } else if (
                      txn.type === "payout" ||
                      txn.type === "booking"
                    ) {
                      return total - txn.amount;
                    }
                    return total;
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Deposits Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Total Deposits</p>
                <ArrowDownCircle size={16} className="text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹
                {transactions
                  .filter(
                    (txn) =>
                      txn.type === "deposit" &&
                      txn.status.toLowerCase() === "success"
                  )
                  .reduce((total, txn) => total + txn.amount, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Prizes Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Total Prizes</p>
                <Trophy size={16} className="text-yellow-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹
                {transactions
                  .filter(
                    (txn) =>
                      txn.type === "prize" &&
                      txn.status.toLowerCase() === "success"
                  )
                  .reduce((total, txn) => total + txn.amount, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Bookings Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Total Spent</p>
                <Calendar size={16} className="text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">
                ₹
                {transactions
                  .filter(
                    (txn) =>
                      txn.type === "booking" &&
                      txn.status.toLowerCase() === "success"
                  )
                  .reduce((total, txn) => total + txn.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/60 p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("deposit")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                filter === "deposit"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <ArrowDownCircle size={14} />
              Deposits
            </button>
            <button
              onClick={() => setFilter("payout")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                filter === "payout"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <ArrowUpCircle size={14} />
              Payouts
            </button>
            <button
              onClick={() => setFilter("booking")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                filter === "booking"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Calendar size={14} />
              Bookings
            </button>
            <button
              onClick={() => setFilter("prize")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                filter === "prize"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Trophy size={14} />
              Prizes
            </button>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg pl-9 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                size={16}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>
            <button
              onClick={fetchTransactions}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-gray-800/60 rounded-xl overflow-hidden shadow-xl border border-gray-700">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/80">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTransactions.map((txn) => (
                    <tr
                      key={txn._id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTransactionTypeIcon(txn.type)}
                          <span className="ml-2 text-white font-medium">
                            {txn.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-lg font-semibold ${
                            txn.type === "deposit" || txn.type === "prize"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {txn.type === "deposit" || txn.type === "prize"
                            ? "+"
                            : "-"}
                          ₹{txn.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {txn.createdAt ? formatDate(txn.createdAt) : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(txn.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {txn.description ||
                          (txn.type === "booking"
                            ? "Game session booking"
                            : txn.type === "prize"
                            ? "Tournament prize"
                            : "Transaction")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <Wallet size={48} className="text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No transactions found</p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="mt-4 text-blue-400 hover:text-blue-300"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
