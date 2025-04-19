// // import { useState, useEffect } from "react";
// // import axiosInstance from "../utils/axiosInstance";
// // import { toast } from "react-toastify";

// // function RequestPayout() {
// //   const [amount, setAmount] = useState("");
// //   const [upiId, setUpiId] = useState(""); // New state for UPI ID
// //   const [isUpiRequired, setIsUpiRequired] = useState(false);

// //   useEffect(() => {
// //     // Check if UPI ID is missing
// //     const checkUpiId = async () => {
// //       try {
// //         const res = await axiosInstance.get("/users/me");
// //         if (!res.data.upiId) {
// //           setIsUpiRequired(true); // If UPI ID is missing, prompt for it
// //         }
// //       } catch (err) {
// //         console.error("Error fetching user profile:", err);
// //       }
// //     };

// //     checkUpiId();
// //   }, []);

// //   const handleRequestPayout = async () => {
// //     try {
// //       const payoutData = { amount };

// //       if (isUpiRequired && !upiId) {
// //         toast.error("Please provide your UPI ID");
// //         return;
// //       }

// //       if (isUpiRequired) {
// //         payoutData.upiId = upiId; // Include UPI ID if required
// //       }

// //       await axiosInstance.post("/payments/request", payoutData);
// //       toast.success("Payout requested successfully!");
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Error requesting payout");
// //     }
// //   };

// //   const handleSaveUpiId = async () => {
// //     try {
// //       await axiosInstance.put("/users/update-upi-id", { upiId });
// //       toast.success("UPI ID saved successfully!");
// //       setIsUpiRequired(false);
// //     } catch (err) {
// //       toast.error("Error saving UPI ID");
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-gray-900 rounded-lg shadow-md">
// //       <h2 className="text-white text-3xl mb-4">Request a Payout</h2>

// //       <div className="space-y-4">
// //         <input
// //           type="number"
// //           value={amount}
// //           onChange={(e) => setAmount(e.target.value)}
// //           placeholder="Enter amount"
// //           className="p-2 w-full rounded bg-gray-700 text-white"
// //         />

// //         {isUpiRequired && (
// //           <>
// //             <input
// //               type="text"
// //               value={upiId}
// //               onChange={(e) => setUpiId(e.target.value)}
// //               placeholder="Enter your UPI ID"
// //               className="p-2 w-full rounded bg-gray-700 text-white"
// //             />
// //             <button
// //               onClick={handleSaveUpiId}
// //               className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
// //             >
// //               Save UPI ID
// //             </button>
// //           </>
// //         )}

// //         <button
// //           onClick={handleRequestPayout}
// //           className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
// //         >
// //           Request Payout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default RequestPayout;

// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";

// function RequestPayout() {
//   const [amount, setAmount] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [isUpiRequired, setIsUpiRequired] = useState(false);

//   useEffect(() => {
//     // Fetch user profile on load to check if UPI is saved
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         if (!res.data.upiId) {
//           setIsUpiRequired(true);
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleRequestPayout = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Enter a valid amount");
//       return;
//     }

//     if (isUpiRequired && !upiId) {
//       toast.error("Please enter your UPI ID");
//       return;
//     }

//     try {
//       await axiosInstance.post("/payout/request", {
//         amount,
//         upiId: isUpiRequired ? upiId : undefined,
//       });

//       toast.success("Payout request sent successfully!");
//       setAmount("");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to request payout");
//     }
//   };

//   const handleSaveUpiId = async () => {
//     if (!upiId) {
//       toast.error("Enter a valid UPI ID");
//       return;
//     }

//     try {
//       await axiosInstance.put("/users/update-upi-id", { upiId });
//       toast.success("UPI ID saved successfully!");
//       setIsUpiRequired(false);
//     } catch (err) {
//       toast.error("Error saving UPI ID");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md">
//       <h2 className="text-white text-3xl mb-4">Request a Payout</h2>

//       <div className="space-y-4">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="p-2 w-full rounded bg-gray-700 text-white"
//         />

//         {isUpiRequired && (
//           <>
//             <input
//               type="text"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               placeholder="Enter your UPI ID"
//               className="p-2 w-full rounded bg-gray-700 text-white"
//             />
//             <button
//               onClick={handleSaveUpiId}
//               className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
//             >
//               Save UPI ID
//             </button>
//           </>
//         )}

//         <button
//           onClick={handleRequestPayout}
//           className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
//         >
//           Request Payout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RequestPayout;

// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";

// function RequestPayout() {
//   const [amount, setAmount] = useState("");
//   const [upiId, setUpiId] = useState(""); // Track UPI ID
//   const [isUpiRequired, setIsUpiRequired] = useState(false); // Check if UPI is required

//   useEffect(() => {
//     // Fetch user profile to check if UPI ID is saved
//     const fetchProfile = async () => {
//       try {
//         const res = await axiosInstance.get("/users/me");
//         if (!res.data.upiId) {
//           setIsUpiRequired(true); // If UPI ID is missing, prompt user to enter it
//         }
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Handle requesting a payout
//   const handleRequestPayout = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Enter a valid amount");
//       return;
//     }

//     if (isUpiRequired && !upiId) {
//       toast.error("Please enter your UPI ID");
//       return;
//     }
//     if (amount < 100) {
//       toast.error("Minimum payout is ₹100");
//       return;
//     }

//     try {
//       // Send payout request to the backend
//       await axiosInstance.post("/payout/request", {
//         amount,
//         upiId: isUpiRequired ? upiId : undefined, // Only send UPI ID if required
//       });

//       toast.success("Payout request sent successfully!");
//       setAmount(""); // Reset the amount input after successful request
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to request payout");
//     }
//   };

//   // Save the UPI ID for the user
//   const handleSaveUpiId = async () => {
//     if (!upiId) {
//       toast.error("Enter a valid UPI ID");
//       return;
//     }

//     try {
//       // Send the UPI ID to the backend to save it
//       await axiosInstance.put("/users/update-upi-id", { upiId });
//       toast.success("UPI ID saved successfully!");
//       setIsUpiRequired(false); // After saving UPI ID, no need to prompt for it anymore
//     } catch (err) {
//       toast.error("Error saving UPI ID");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md">
//       <h2 className="text-white text-3xl mb-4">Request a Payout</h2>

//       <div className="space-y-4">
//         {/* Amount input */}
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="p-2 w-full rounded bg-gray-700 text-white"
//         />

//         {/* UPI ID input if required */}
//         {isUpiRequired && (
//           <>
//             <input
//               type="text"
//               value={upiId}
//               onChange={(e) => setUpiId(e.target.value)}
//               placeholder="Enter your UPI ID"
//               className="p-2 w-full rounded bg-gray-700 text-white"
//             />
//             <button
//               onClick={handleSaveUpiId}
//               className="bg-green-600 hover:bg-green-700 p-2 rounded font-semibold"
//             >
//               Save UPI ID
//             </button>
//           </>
//         )}

//         {/* Request payout button */}
//         <button
//           onClick={handleRequestPayout}
//           className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
//         >
//           Request Payout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RequestPayout;

import { useState, useEffect } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Wallet, CreditCard, ArrowRight, Check, Info } from "lucide-react";

function RequestPayout() {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isUpiRequired, setIsUpiRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Fetch user profile to check if UPI ID is saved
    const fetchUserData = async () => {
      try {
        const userRes = await axiosInstance.get("/users/me");
        if (!userRes.data.upiId) {
          setIsUpiRequired(true);
        } else {
          setUpiId(userRes.data.upiId);
        }

        // You could also fetch the user's current balance if your API supports it
        // This is just placeholder code - adjust according to your actual API
        try {
          const balanceRes = await axiosInstance.get("/wallet/balance");
          setBalance(balanceRes.data.balance);
        } catch (err) {
          // Balance endpoint might not exist, just ignore this error
          console.log("Could not fetch balance");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUserData();
  }, []);

  // Handle requesting a payout
  const handleRequestPayout = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    if (isUpiRequired && !upiId) {
      toast.error("Please enter your UPI ID");
      return;
    }

    if (amount < 100) {
      toast.error("Minimum payout is ₹100");
      return;
    }

    setLoading(true);
    try {
      // Send payout request to the backend
      await axiosInstance.post("/payout/request", {
        amount,
        upiId: isUpiRequired ? upiId : undefined,
      });

      toast.success("Payout request sent successfully!");
      setAmount(""); // Reset the amount input after successful request
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to request payout");
    } finally {
      setLoading(false);
    }
  };

  // Save the UPI ID for the user
  const handleSaveUpiId = async () => {
    if (!upiId) {
      toast.error("Enter a valid UPI ID");
      return;
    }

    setLoading(true);
    try {
      // Send the UPI ID to the backend to save it
      await axiosInstance.put("/users/update-upi-id", { upiId });
      toast.success("UPI ID saved successfully!");
      setIsUpiRequired(false); // After saving UPI ID, no need to prompt for it anymore
    } catch (err) {
      toast.error("Error saving UPI ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-xl mx-auto">
        {/* Card container */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 px-6 py-4 flex items-center">
            <Wallet className="text-white mr-2" size={24} />
            <h2 className="text-white text-2xl font-bold">Request Payout</h2>
          </div>

          {/* Balance display */}
          <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available Balance</span>
              <span className="text-white font-semibold text-xl">
                ₹{balance}
              </span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-6 space-y-5">
            {/* Amount input with label */}
            <div className="space-y-2">
              <label className="block text-gray-400 text-sm font-medium">
                Payout Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-semibold">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Info size={12} className="inline mr-1" />
                <span>Minimum payout amount is ₹100</span>
              </div>
            </div>

            {/* UPI ID input if required */}
            {isUpiRequired ? (
              <div className="space-y-2">
                <label className="block text-gray-400 text-sm font-medium">
                  UPI ID
                </label>
                <div className="relative">
                  <CreditCard
                    className="absolute left-3 top-3 text-gray-500"
                    size={16}
                  />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="pl-10 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSaveUpiId}
                  disabled={loading}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-60"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <Check size={18} />
                      <span>Save UPI ID</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-400 text-sm">Payment Method</h3>
                    <div className="text-white flex items-center mt-1">
                      <CreditCard className="mr-2" size={16} />
                      <span className="font-medium">{upiId}</span>
                    </div>
                  </div>
                  <div className="bg-green-600 bg-opacity-20 text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                    Saved
                  </div>
                </div>
              </div>
            )}

            {/* Request payout button */}
            <button
              onClick={handleRequestPayout}
              disabled={loading || (isUpiRequired && !upiId)}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-60"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <span>Request Payout</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Payouts typically process within 24-48 hours. Contact support for
              assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPayout;
