// import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";

// function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [qrExpired, setQrExpired] = useState(false);
//   const [createdAt, setCreatedAt] = useState(null);

//   // Check if QR is expired
//   const checkExpiration = () => {
//     if (!createdAt) return;
//     const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
//     const now = new Date().getTime();
//     if (now - createdAt > expirationTime) {
//       setQrExpired(true);
//     }
//   };

//   const handleRequest = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Enter a valid amount");
//       return;
//     }
//     try {
//       const res = await axiosInstance.post("/payments/request", { amount });
//       setCreatedAt(new Date().getTime()); // Set created time
//       toast.success("Payment request submitted. Admin will verify.");
//       setAmount(""); // Clear input after request
//     } catch (err) {
//       toast.error("Failed to submit request.");
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkExpiration();
//     }, 1000); // Check every second

//     return () => clearInterval(interval); // Clear interval on unmount
//   }, [createdAt]);

//   const upiLink = `upi://pay?pa=shantanuk436@okaxis&pn=ValoPlay&am=${amount}&cu=INR`;
//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-3xl mb-6">💸 Add Money to Wallet</h2>

//       <div className="flex flex-col space-y-4">
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter amount"
//           className="text-black p-3 rounded w-60"
//         />

//         <button
//           onClick={handleRequest}
//           className="bg-green-600 hover:bg-green-700 p-3 rounded font-semibold w-60"
//         >
//           📤 I've Paid & Submit Request
//         </button>

//         {amount && !qrExpired && (
//           <div className="mt-6 space-y-3">
//             <h3 className="text-xl">Scan to Pay ₹{amount}</h3>
//             <div className="p-4 bg-white inline-block rounded">
//               <QRCode
//                 value={upiLink}
//                 bgColor="#ffffff"
//                 fgColor="#000000"
//                 size={180}
//               />
//             </div>
//           </div>
//         )}

//         {qrExpired && (
//           <div className="text-red-500 mt-4">
//             <h4>QR Code has expired! Please request a new payment link.</h4>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddMoney;

// import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import { Wallet, Clock, RefreshCw, CreditCard, ArrowRight } from "lucide-react";

// function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [qrExpired, setQrExpired] = useState(false);
//   const [createdAt, setCreatedAt] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [showQr, setShowQr] = useState(false);

//   // Predefined amounts
//   const quickAmounts = [100, 200, 500, 1000];

//   // Generate UPI payment link
//   const upiLink = `upi://pay?pa=shantanuk436@okaxis&pn=ValoPlay&am=${amount}&cu=INR`;

//   // Check if QR is expired and update countdown
//   const checkExpiration = () => {
//     if (!createdAt) return;

//     const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
//     const now = new Date().getTime();
//     const elapsed = now - createdAt;

//     if (elapsed > expirationTime) {
//       setQrExpired(true);
//       setTimeLeft(null);
//     } else {
//       setTimeLeft(Math.floor((expirationTime - elapsed) / 1000));
//     }
//   };

//   // Request payment
//   const handleRequest = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/payments/request", { amount });
//       setCreatedAt(new Date().getTime());
//       setQrExpired(false);
//       setShowQr(true);
//       toast.success("Payment request submitted. Scan the QR code to pay.");
//     } catch (err) {
//       toast.error("Failed to submit request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate new QR code
//   const handleRefreshQR = () => {
//     setCreatedAt(new Date().getTime());
//     setQrExpired(false);
//   };

//   // Handle quick amount selection
//   const handleQuickAmount = (value) => {
//     setAmount(value.toString());
//   };

//   // Submit after payment
//   const handleSubmitAfterPayment = async () => {
//     try {
//       await axiosInstance.post("/payments/request", { amount });
//       toast.success("Payment confirmation submitted. Admin will verify.");
//       setAmount("");
//       setShowQr(false);
//     } catch (err) {
//       toast.error("Failed to confirm payment.");
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkExpiration();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [createdAt]);

//   // Format time remaining
//   const formatTime = (seconds) => {
//     if (!seconds) return "--:--";
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, "0")}:${secs
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 py-8 px-4">
//       <div className="max-w-md mx-auto">
//         {/* Card Container */}
//         <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4 flex items-center justify-between">
//             <div className="flex items-center">
//               <Wallet className="text-white mr-2" size={24} />
//               <h2 className="text-white text-2xl font-bold">Add Money</h2>
//             </div>
//             {showQr && timeLeft && (
//               <div className="flex items-center bg-black bg-opacity-30 px-3 py-1 rounded-full">
//                 <Clock className="text-white mr-1" size={16} />
//                 <span className="text-white text-sm font-medium">
//                   {formatTime(timeLeft)}
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="p-6 space-y-6">
//             {!showQr ? (
//               <>
//                 {/* Amount Input Section */}
//                 <div className="space-y-2">
//                   <label className="block text-gray-400 text-sm font-medium">
//                     Enter Amount
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-3 top-3 text-gray-500 font-semibold">
//                       ₹
//                     </span>
//                     <input
//                       type="number"
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                       placeholder="0"
//                       className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
//                     />
//                   </div>

//                   {/* Quick Amount Selection */}
//                   <div className="grid grid-cols-4 gap-2 mt-3">
//                     {quickAmounts.map((value) => (
//                       <button
//                         key={value}
//                         onClick={() => handleQuickAmount(value)}
//                         className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-white font-medium transition-colors"
//                       >
//                         ₹{value}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Generate QR Button */}
//                 <button
//                   onClick={handleRequest}
//                   disabled={loading || !amount}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-60"
//                 >
//                   {loading ? (
//                     <svg
//                       className="animate-spin h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                   ) : (
//                     <>
//                       <CreditCard size={18} />
//                       <span>Generate Payment QR</span>
//                     </>
//                   )}
//                 </button>
//               </>
//             ) : (
//               <>
//                 {/* QR Code Display */}
//                 <div className="flex flex-col items-center space-y-4">
//                   <h3 className="text-xl font-medium text-white">
//                     Scan to Pay ₹{amount}
//                   </h3>

//                   {qrExpired ? (
//                     <div className="bg-gray-800 p-6 rounded-lg text-center">
//                       <div className="text-red-500 mb-4">
//                         QR Code has expired!
//                       </div>
//                       <button
//                         onClick={handleRefreshQR}
//                         className="inline-flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
//                       >
//                         <RefreshCw size={16} className="mr-2" />
//                         Generate New QR
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="bg-white p-4 rounded-lg">
//                       <QRCode
//                         value={upiLink}
//                         bgColor="#ffffff"
//                         fgColor="#000000"
//                         size={180}
//                       />
//                     </div>
//                   )}

//                   <div className="text-gray-400 text-sm text-center mt-2">
//                     Scan with any UPI app to make payment
//                   </div>
//                 </div>

//                 {/* Payment Details */}
//                 <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <div className="text-gray-400">UPI ID:</div>
//                     <div className="text-white font-medium">
//                       shantanuk436@okaxis
//                     </div>
//                     <div className="text-gray-400">Name:</div>
//                     <div className="text-white font-medium">ValoPlay</div>
//                     <div className="text-gray-400">Amount:</div>
//                     <div className="text-white font-medium">₹{amount}</div>
//                   </div>
//                 </div>

//                 {/* Submit confirmation button */}
//                 <button
//                   onClick={handleSubmitAfterPayment}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   <span>I've Paid & Submit Request</span>
//                   <ArrowRight size={18} />
//                 </button>
//               </>
//             )}

//             {/* Instructions */}
//             <div className="text-gray-400 text-xs">
//               <p className="mb-1">
//                 • Payment will be verified by admin within 24 hours
//               </p>
//               <p className="mb-1">• QR code is valid for 5 minutes only</p>
//               <p>• Contact support for any payment issues</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddMoney;

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Wallet, Clock, RefreshCw, CreditCard, ArrowRight } from "lucide-react";

function AddMoney() {
  const [amount, setAmount] = useState("");
  const [qrExpired, setQrExpired] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const [loading, setLoading] = useState(false);

  const quickAmounts = [100, 200, 500, 1000];
  const upiLink = `upi://pay?pa=shantanuk436@okaxis&pn=ValoPlay&am=${amount}&cu=INR`;

  const checkExpiration = () => {
    if (!createdAt) return;
    const expirationTime = 5 * 60 * 1000;
    const now = new Date().getTime();
    const elapsed = now - createdAt;

    if (elapsed > expirationTime) {
      setQrExpired(true);
      setTimeLeft(null);
    } else {
      setTimeLeft(Math.floor((expirationTime - elapsed) / 1000));
    }
  };

  const handleGenerateQR = () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    setCreatedAt(new Date().getTime());
    setQrExpired(false);
    setShowQr(true);
  };

  const handleSubmitAfterPayment = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Invalid amount");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("/payments/request", { amount });
      toast.success("Payment request submitted. Admin will verify soon.");
      setAmount("");
      setShowQr(false);
    } catch (err) {
      toast.error("Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkExpiration();
    }, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  const formatTime = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="text-white mr-2" size={24} />
              <h2 className="text-white text-2xl font-bold">Add Money</h2>
            </div>
            {showQr && timeLeft && (
              <div className="flex items-center bg-black bg-opacity-30 px-3 py-1 rounded-full">
                <Clock className="text-white mr-1" size={16} />
                <span className="text-white text-sm font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 space-y-6">
            {!showQr ? (
              <>
                <div className="space-y-2">
                  <label className="block text-gray-400 text-sm font-medium">
                    Enter Amount
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
                      className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {quickAmounts.map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-white font-medium transition-colors"
                      >
                        ₹{value}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateQR}
                  className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <CreditCard size={18} />
                  <span>Generate Payment QR</span>
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-medium text-white">
                    Scan to Pay ₹{amount}
                  </h3>

                  {qrExpired ? (
                    <div className="text-red-500 font-medium">
                      QR Code expired!
                    </div>
                  ) : (
                    <div className="bg-white p-4 rounded-lg">
                      <QRCode
                        value={upiLink}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        size={180}
                      />
                    </div>
                  )}

                  <div className="text-gray-400 text-sm text-center mt-2">
                    Scan with any UPI app to make payment
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-gray-400">UPI ID:</div>
                    <div className="text-white font-medium">
                      shantanuk436@okaxis
                    </div>
                    <div className="text-gray-400">Name:</div>
                    <div className="text-white font-medium">ValoPlay</div>
                    <div className="text-gray-400">Amount:</div>
                    <div className="text-white font-medium">₹{amount}</div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitAfterPayment}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      I've Paid & Submit Request <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMoney;
