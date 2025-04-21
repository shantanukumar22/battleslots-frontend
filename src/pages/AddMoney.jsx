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

// import { useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import { Wallet, Clock, RefreshCw, CreditCard, ArrowRight } from "lucide-react";

// function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [qrExpired, setQrExpired] = useState(false);
//   const [createdAt, setCreatedAt] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [showQr, setShowQr] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const quickAmounts = [100, 200, 500, 1000];
//   const upiLink = `upi://pay?pa=shantanuk436@okaxis&pn=ValoPlay&am=${amount}&cu=INR`;

//   const checkExpiration = () => {
//     if (!createdAt) return;
//     const expirationTime = 5 * 60 * 1000;
//     const now = new Date().getTime();
//     const elapsed = now - createdAt;

//     if (elapsed > expirationTime) {
//       setQrExpired(true);
//       setTimeLeft(null);
//     } else {
//       setTimeLeft(Math.floor((expirationTime - elapsed) / 1000));
//     }
//   };

//   const handleGenerateQR = () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Enter a valid amount");
//       return;
//     }
//     setCreatedAt(new Date().getTime());
//     setQrExpired(false);
//     setShowQr(true);
//   };

//   const handleSubmitAfterPayment = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Invalid amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axiosInstance.post("/payments/request", { amount });
//       toast.success("Payment request submitted. Admin will verify soon.");
//       setAmount("");
//       setShowQr(false);
//     } catch (err) {
//       toast.error("Failed to submit request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       checkExpiration();
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [createdAt]);

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
//         <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
//           <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
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

//           <div className="p-6 space-y-6">
//             {!showQr ? (
//               <>
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

//                   <div className="grid grid-cols-4 gap-2 mt-3">
//                     {quickAmounts.map((value) => (
//                       <button
//                         key={value}
//                         onClick={() => setAmount(value.toString())}
//                         className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-white font-medium transition-colors"
//                       >
//                         ₹{value}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleGenerateQR}
//                   className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   <CreditCard size={18} />
//                   <span>Generate Payment QR</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="flex flex-col items-center space-y-4">
//                   <h3 className="text-xl font-medium text-white">
//                     Scan to Pay ₹{amount}
//                   </h3>

//                   {qrExpired ? (
//                     <div className="text-red-500 font-medium">
//                       QR Code expired!
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

//                 <button
//                   onClick={handleSubmitAfterPayment}
//                   disabled={loading}
//                   className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//                 >
//                   {loading ? (
//                     "Processing..."
//                   ) : (
//                     <>
//                       I've Paid & Submit Request <ArrowRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddMoney;

// import { useState } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import { Wallet, CreditCard } from "lucide-react";

// function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);

//   const quickAmounts = [100, 200, 500, 1000];

//   const handlePayment = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Create order from backend
//       const res = await axiosInstance.post("/payments/create-order", {
//         amount,
//       });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend key
//         amount: res.data.amount,
//         currency: "INR",
//         name: "ValoPlay",
//         description: "Wallet Top-up",
//         order_id: res.data.id,
//         handler: async (response) => {
//           // Confirm payment success to backend
//           await axiosInstance.post("/payments/verify-payment", {
//             paymentId: response.razorpay_payment_id,
//             amount: res.data.amount / 100,
//           });
//           toast.success("Payment successful, wallet credited!");
//           setAmount("");
//         },
//         prefill: {
//           name: "Gamer",
//           email: "gamer@valoplay.com",
//         },
//         theme: {
//           color: "#EF4444",
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to initiate payment.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 py-8 px-4">
//       <div className="max-w-md mx-auto">
//         <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
//           <div className="bg-red-600 px-6 py-4 flex items-center">
//             <Wallet className="text-white mr-2" size={24} />
//             <h2 className="text-white text-2xl font-bold">Add Money</h2>
//           </div>

//           <div className="p-6 space-y-6">
//             <div className="space-y-2">
//               <label className="block text-gray-400 text-sm font-medium">
//                 Enter Amount
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-gray-500 font-semibold">
//                   ₹
//                 </span>
//                 <input
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   placeholder="0"
//                   className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
//                 />
//               </div>

//               <div className="grid grid-cols-4 gap-2 mt-3">
//                 {quickAmounts.map((value) => (
//                   <button
//                     key={value}
//                     onClick={() => setAmount(value.toString())}
//                     className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-white font-medium transition-colors"
//                   >
//                     ₹{value}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={loading}
//               className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//             >
//               {loading ? (
//                 "Processing..."
//               ) : (
//                 <>
//                   <CreditCard size={18} />
//                   <span>Pay Now</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddMoney;

// import { useState } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import {
//   Wallet,
//   CreditCard,
//   Shield,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// function AddMoney() {
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [transactionDetails, setTransactionDetails] = useState(null);

//   const quickAmounts = [100, 200, 500, 1000];

//   const handlePayment = async () => {
//     if (!amount || Number(amount) <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Create order from backend
//       const res = await axiosInstance.post("/payments/create-order", {
//         amount,
//       });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend key
//         amount: res.data.amount,
//         currency: "INR",
//         name: "Battleslot",
//         description: "Secure Wallet Top-up",
//         order_id: res.data.id,
//         handler: async (response) => {
//           try {
//             // Confirm payment success to backend
//             const verifyRes = await axiosInstance.post(
//               "/payments/verify-payment",
//               {
//                 paymentId: response.razorpay_payment_id,
//                 amount: res.data.amount / 100,
//               }
//             );

//             // Set transaction details for receipt
//             setTransactionDetails({
//               paymentId: response.razorpay_payment_id,
//               amount: res.data.amount / 100,
//               timestamp: new Date().toLocaleString(),
//               status: "Successful",
//             });

//             setShowReceipt(true);
//             toast.success("Payment successful! Your wallet has been credited.");
//             setAmount("");
//           } catch (err) {
//             toast.error("Payment verification failed. Please contact support.");
//           }
//         },
//         prefill: {
//           name: "Gamer",
//           email: "gamer@valoplay.com",
//         },
//         theme: {
//           color: "#EF4444",
//         },
//         modal: {
//           confirm_close: true,
//           ondismiss: () => {
//             toast.info("Payment cancelled");
//             setLoading(false);
//           },
//         },
//         notes: {
//           merchant_order_id: `VPL-${Date.now()}`,
//         },
//       };

//       const razor = new window.Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to initiate payment. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeReceipt = () => {
//     setShowReceipt(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 py-8 px-4">
//       <div className="max-w-md mx-auto">
//         {showReceipt ? (
//           <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
//             <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 <CheckCircle className="text-white mr-2" size={24} />
//                 <h2 className="text-white text-2xl font-bold">
//                   Payment Successful
//                 </h2>
//               </div>
//               <button
//                 onClick={closeReceipt}
//                 className="text-white hover:text-gray-200"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <div className="flex justify-center py-3">
//                 <div className="rounded-full bg-green-100 p-3">
//                   <CheckCircle size={48} className="text-green-600" />
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Amount Added Successfully!
//                 </h3>
//                 <p className="text-gray-600">
//                   Your wallet has been credited with ₹
//                   {transactionDetails?.amount}
//                 </p>
//               </div>

//               <div className="space-y-3 border-t border-b border-gray-200 py-4">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Transaction ID</span>
//                   <span className="text-gray-900 font-medium">
//                     {transactionDetails?.paymentId}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Amount</span>
//                   <span className="text-gray-900 font-medium">
//                     ₹{transactionDetails?.amount}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date & Time</span>
//                   <span className="text-gray-900 font-medium">
//                     {transactionDetails?.timestamp}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Status</span>
//                   <span className="text-green-600 font-medium">
//                     ✓ {transactionDetails?.status}
//                   </span>
//                 </div>
//               </div>

//               <button
//                 onClick={closeReceipt}
//                 className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg"
//               >
//                 Return to Wallet
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
//             <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
//               <div className="flex items-center">
//                 <Wallet className="text-white mr-2" size={24} />
//                 <h2 className="text-white text-2xl font-bold">Add Money</h2>
//               </div>
//               <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-2 py-1">
//                 <Shield size={16} className="text-white mr-1" />
//                 <span className="text-white text-xs">Secure Payment</span>
//               </div>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-gray-400 text-sm font-medium">
//                   Enter Amount
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-gray-500 font-semibold">
//                     ₹
//                   </span>
//                   <input
//                     type="number"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     placeholder="0"
//                     className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
//                   />
//                 </div>

//                 <div className="grid grid-cols-4 gap-2 mt-3">
//                   {quickAmounts.map((value) => (
//                     <button
//                       key={value}
//                       onClick={() => setAmount(value.toString())}
//                       className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded-lg text-white font-medium transition-colors"
//                     >
//                       ₹{value}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
//                 <h3 className="text-gray-300 font-medium mb-2 flex items-center">
//                   <Shield size={16} className="text-green-400 mr-2" />
//                   Payment Security
//                 </h3>
//                 <p className="text-gray-400 text-sm">
//                   Your transaction is secured with industry-standard encryption.
//                   Razorpay ensures your payment information is protected.
//                 </p>
//               </div>

//               <div className="flex items-center space-x-2 text-gray-400 text-sm">
//                 <div className="flex">
//                   <img
//                     src="/api/placeholder/40/25"
//                     alt="Visa"
//                     className="h-5"
//                   />
//                   <img
//                     src="/api/placeholder/40/25"
//                     alt="Mastercard"
//                     className="h-5"
//                   />
//                   <img src="/api/placeholder/40/25" alt="UPI" className="h-5" />
//                 </div>
//                 <span>and more payment options</span>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 disabled={loading}
//                 className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
//               >
//                 {loading ? (
//                   <span>Processing...</span>
//                 ) : (
//                   <>
//                     <CreditCard size={18} />
//                     <span>Proceed to Secure Payment</span>
//                   </>
//                 )}
//               </button>

//               <div className="text-center text-gray-400 text-xs flex items-center justify-center">
//                 <img
//                   src="/api/placeholder/80/20"
//                   alt="Razorpay"
//                   className="h-4 mr-2"
//                 />
//                 <span>Secured by Razorpay | PCI DSS Compliant</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AddMoney;

import { useState } from "react";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { Wallet, CreditCard, Shield, CheckCircle } from "lucide-react";

function AddMoney() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const quickAmounts = [100, 200, 500, 1000];

  const handlePayment = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/payments/create-order", {
        amount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: res.data.amount,
        currency: "INR",
        name: "Battleslot",
        description: "Secure Wallet Top-up",
        order_id: res.data.id,
        handler: async (response) => {
          try {
            await axiosInstance.post("/payments/verify-payment", {
              paymentId: response.razorpay_payment_id,
              amount: res.data.amount / 100,
            });

            setTransactionDetails({
              paymentId: response.razorpay_payment_id,
              amount: res.data.amount / 100,
              timestamp: new Date().toLocaleString(),
              status: "Successful",
            });

            setShowReceipt(true);
            toast.success("Payment successful! Your wallet has been credited.");
            setAmount("");
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Gamer",
          email: "gamer@valoplay.com",
        },
        theme: { color: "#EF4444" },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            toast.info("Payment cancelled");
            setLoading(false);
          },
        },
        notes: {
          merchant_order_id: `VPL-${Date.now()}`,
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeReceipt = () => setShowReceipt(false);

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        {showReceipt ? (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="text-white mr-2" size={24} />
                <h2 className="text-white text-2xl font-bold">
                  Payment Successful
                </h2>
              </div>
              <button
                onClick={closeReceipt}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-center py-3">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Amount Added Successfully!
                </h3>
                <p className="text-gray-600">
                  Your wallet has been credited with ₹
                  {transactionDetails?.amount}
                </p>
              </div>

              <div className="space-y-3 border-t border-b border-gray-200 py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="text-gray-900 font-medium">
                    {transactionDetails?.paymentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-gray-900 font-medium">
                    ₹{transactionDetails?.amount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span className="text-gray-900 font-medium">
                    {transactionDetails?.timestamp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="text-green-600 font-medium">
                    ✓ {transactionDetails?.status}
                  </span>
                </div>
              </div>

              <button
                onClick={closeReceipt}
                className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg"
              >
                Return to Wallet
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <Wallet className="text-white mr-2" size={24} />
                <h2 className="text-white text-2xl font-bold">Add Money</h2>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-2 py-1">
                <Shield size={16} className="text-white mr-1" />
                <span className="text-white text-xs">Secure Payment</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
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
                    className="pl-8 pr-4 py-3 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-red-500 focus:ring-1 focus:ring-red-500"
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

              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h3 className="text-gray-300 font-medium mb-2 flex items-center">
                  <Shield size={16} className="text-green-400 mr-2" />
                  Payment Security
                </h3>
                <p className="text-gray-400 text-sm">
                  Your transaction is secured with industry-standard encryption.
                  Razorpay ensures your payment information is protected.
                </p>
              </div>

              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                {/* VISA Icon */}
                <svg width="40" height="25" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#1A1F36" />
                  <text
                    x="19"
                    y="16"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    VISA
                  </text>
                </svg>

                {/* Mastercard Icon */}
                <svg width="40" height="25" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#1A1F36" />
                  <circle cx="14" cy="12" r="6" fill="#EB001B" />
                  <circle cx="24" cy="12" r="6" fill="#F79E1B" />
                </svg>

                {/* UPI Icon */}
                <svg width="40" height="25" viewBox="0 0 38 24" fill="none">
                  <rect width="38" height="24" rx="4" fill="#1A1F36" />
                  <text
                    x="19"
                    y="16"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="9"
                    fontFamily="Arial"
                  >
                    UPI
                  </text>
                </svg>

                <span>and more payment options</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CreditCard size={18} />
                    <span>Proceed to Secure Payment</span>
                  </>
                )}
              </button>

              <div className="text-center text-gray-400 text-xs flex items-center justify-center">
                <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                  <rect width="80" height="20" rx="3" fill="#1A1F36" />
                  <text
                    x="40"
                    y="14"
                    textAnchor="middle"
                    fill="#fff"
                    fontSize="10"
                    fontFamily="Arial"
                  >
                    Razorpay Secure
                  </text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMoney;
