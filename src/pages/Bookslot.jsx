// import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { toast } from "react-toastify";
// import Modal from "../components/Modal";

// function BookSlot() {
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const fetchTimeSlots = async () => {
//     try {
//       const res = await axiosInstance.get("/timeslots/");
//       setTimeSlots(res.data); // This should now return slots with `isResultDeclared` flag
//     } catch (err) {
//       console.log("Error fetching time slots:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTimeSlots();
//   }, []);

//   const handleBooking = async (slotId) => {
//     try {
//       const res = await axiosInstance.post(`/timeslots/book/${slotId}`);
//       toast.success(res.data.message || "Slot booked successfully!");
//       fetchTimeSlots();
//       handleCloseModal();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to book time slot");
//     }
//   };

//   const handleOpenModal = (slot) => {
//     setSelectedSlot(slot);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedSlot(null);
//   };

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg shadow-md">
//       <h2 className="text-white text-3xl mb-4">Book a Time Slot</h2>
//       <div className="bg-gray-800 p-6 rounded-md space-y-4">
//         {timeSlots.length > 0 ? (
//           timeSlots.map((slot) => (
//             <div
//               key={slot._id}
//               className="flex justify-between items-center text-white border-b border-gray-700 pb-3"
//             >
//               <div>
//                 <p className="text-lg font-semibold">{slot.time}</p>
//                 <p className="text-sm text-gray-400">
//                   Players: {slot.players.length}/10
//                 </p>
//                 {slot.isResultDeclared && (
//                   <p className="text-yellow-400 font-semibold mt-1">
//                     Results Declared
//                   </p>
//                 )}
//               </div>

//               {slot.isResultDeclared ? (
//                 <span className="text-yellow-400 font-bold">Closed</span>
//               ) : slot.players.length >= 10 ? (
//                 <span className="text-red-500 font-bold">Full</span>
//               ) : (
//                 <button
//                   onClick={() => handleOpenModal(slot)}
//                   className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded font-semibold"
//                 >
//                   Book
//                 </button>
//               )}
//             </div>
//           ))
//         ) : (
//           <p className="text-white">No time slots available right now.</p>
//         )}
//       </div>

//       {/* Modal */}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onConfirm={() =>
//           selectedSlot &&
//           !selectedSlot.isResultDeclared &&
//           handleBooking(selectedSlot._id)
//         }
//         slotDetails={selectedSlot}
//       />
//     </div>
//   );
// }

// export default BookSlot;

import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import {
  Calendar,
  Clock,
  Users,
  Check,
  X,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

function BookSlot() {
  const [timeSlots, setTimeSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTimeSlots = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/timeslots/");
      setTimeSlots(res.data.reverse());
    } catch (err) {
      console.log("Error fetching time slots:", err);
      toast.error("Failed to load time slots");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const refreshTimeSlots = () => {
    setIsRefreshing(true);
    fetchTimeSlots();
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  const handleBooking = async (slotId) => {
    try {
      const res = await axiosInstance.post(`/timeslots/book/${slotId}`);
      toast.success(res.data.message || "Slot booked successfully!");
      fetchTimeSlots();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book time slot");
    }
  };

  const handleOpenModal = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const getSlotStatusBadge = (slot) => {
    if (slot.isResultDeclared) {
      return (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-slate-200 rounded-full shadow-md">
          <Check size={14} />
          <span className="text-xs font-semibold">Results Declared</span>
        </div>
      );
    } else if (slot.players.length >= 10) {
      return (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-red-700 text-white rounded-full shadow-md">
          <X size={14} />
          <span className="text-xs font-semibold">Full</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-full shadow-md">
          <Check size={14} />
          <span className="text-xs font-semibold">Available</span>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Full Image Banner */}
      <div className="h-80 relative overflow-hidden">
        {/* Replace with your actual banner image URL */}
        <img
          src="https://i.pinimg.com/736x/ba/9e/69/ba9e69a8bf0252cb9ba6b7dd70fce4ec.jpg"
          alt="Gaming Tournament Banner"
          className="w-full h-full object-cover"
        />

        {/* Darkened overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-16 h-16 border-t-2 border-l-2 border-blue-400 opacity-70"></div>

              <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
                GAMING <span className="text-blue-400">TOURNAMENT</span>{" "}
                SCHEDULER
              </h1>
              <p className="text-lg text-gray-100 mb-6 max-w-xl">
                Secure your spot and compete with the best players in our
                upcoming gaming sessions
              </p>
              <div className="inline-block relative">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 400, behavior: "smooth" })
                  }
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-600/30 group"
                >
                  VIEW SLOTS
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                {/* Decorative element */}
                <div className="absolute -bottom-3 -right-3 w-full h-full border-b-2 border-r-2 border-blue-400 opacity-70"></div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-2 border-r-2 border-purple-400 opacity-70"></div>
            </div>
          </div>
        </div>

        {/* Accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white text-3xl font-bold flex items-center mb-2">
                <Calendar className="mr-3 text-blue-400" size={28} />
                Available Time Slots
              </h2>
              <p className="text-gray-400 ml-10">
                Book your preferred gaming session
              </p>
            </div>
            <button
              onClick={refreshTimeSlots}
              disabled={isRefreshing}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2 transition-all duration-300 shadow-md"
            >
              <RefreshCw
                size={18}
                className={isRefreshing ? "animate-spin" : ""}
              />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-300">Loading available slots...</p>
            </div>
          ) : timeSlots.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot._id}
                  className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 shadow-xl group hover:shadow-blue-900/20 hover:-translate-y-1"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                    <div
                      className={`w-24 transform rotate-45 translate-x-4 -translate-y-8 h-4 ${
                        slot.isResultDeclared
                          ? "bg-gray-600"
                          : slot.players.length >= 10
                          ? "bg-red-600"
                          : "bg-blue-600"
                      }`}
                    ></div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-center mb-5">
                      <div className="flex items-center">
                        <div className="p-2 bg-blue-900/30 rounded-lg mr-3">
                          <Clock className="text-blue-400" size={22} />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">
                          {slot.time}
                        </h3>
                      </div>
                      {getSlotStatusBadge(slot)}
                    </div>

                    <div className="flex items-center text-gray-300 mb-6">
                      <div className="p-1.5 bg-blue-900/30 rounded-lg mr-3">
                        <Users className="text-blue-400" size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm font-medium">Players</span>
                          <span className="text-sm font-bold">
                            {slot.players.length}/10
                          </span>
                        </div>
                        <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              slot.players.length >= 10
                                ? "bg-red-600"
                                : "bg-gradient-to-r from-blue-600 to-purple-600"
                            }`}
                            style={{
                              width: `${(slot.players.length / 10) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      {slot.isResultDeclared ? (
                        <button
                          disabled
                          className="px-5 py-2.5 bg-gray-700 text-white rounded-md cursor-not-allowed font-medium"
                        >
                          Results Declared
                        </button>
                      ) : slot.players.length >= 10 ? (
                        <button
                          disabled
                          className="px-5 py-2.5 bg-red-800 text-white rounded-md cursor-not-allowed font-medium"
                        >
                          Full
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenModal(slot)}
                          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-md font-medium transition-all duration-300 shadow-lg shadow-blue-600/30"
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-16 text-center shadow-xl">
              <div className="bg-blue-900/20 w-20 h-20 rounded-full flex justify-center items-center mx-auto mb-6">
                <Calendar className="text-blue-400" size={40} />
              </div>
              <h3 className="text-2xl text-white font-bold mb-3">
                No Time Slots Available
              </h3>
              <p className="text-gray-300 max-w-md mx-auto">
                Check back later for upcoming gaming sessions. New slots are
                typically added every week.
              </p>
              <button
                onClick={refreshTimeSlots}
                className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md inline-flex items-center gap-2 transition-all duration-300"
              >
                <RefreshCw
                  size={18}
                  className={isRefreshing ? "animate-spin" : ""}
                />
                Check Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={() =>
          selectedSlot &&
          !selectedSlot.isResultDeclared &&
          handleBooking(selectedSlot._id)
        }
        slotDetails={selectedSlot}
      />
    </div>
  );
}

export default BookSlot;
