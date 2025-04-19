function Modal({ isOpen, onClose, onConfirm, slotDetails }) {
  if (!isOpen) return null;

  const prizeList = [
    { position: "1st Prize", amount: "₹140", icon: "🏆" },
    { position: "2nd Prize", amount: "₹110", icon: "🥈" },
    { position: "3rd Prize", amount: "₹100", icon: "🥉" },
    { position: "4th Prize", amount: "₹80", icon: "🎖️" },
    { position: "5th Prize", amount: "₹70", icon: "🎖️" },
    { position: "6th Prize", amount: "₹60", icon: "🎖️" },
    { position: "7th Prize", amount: "₹55", icon: "🎖️" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-xl w-full max-w-md shadow-2xl border border-indigo-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with glowing effect */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-indigo-500 opacity-20 rounded-lg blur"></div>
          <h3 className="relative text-white text-2xl font-bold flex items-center">
            <span className="text-indigo-400 mr-2">🎮</span>
            Confirm Booking
          </h3>
        </div>

        {/* Game details */}
        <div className="bg-slate-800/60 rounded-lg p-4 mb-5 border border-slate-700">
          <div className="text-gray-200 space-y-2">
            <p className="flex justify-between">
              <span className="flex items-center">
                <span className="text-indigo-300 mr-2">⏰</span> Time:
              </span>
              <span className="font-medium">{slotDetails?.time}</span>
            </p>
            <p className="flex justify-between">
              <span className="flex items-center">
                <span className="text-indigo-300 mr-2">👥</span> Available
                Spots:
              </span>
              <span className="font-medium">
                {10 - slotDetails?.players.length}
                <span className="text-gray-400">/10</span>
              </span>
            </p>
            <p className="flex justify-between">
              <span className="flex items-center">
                <span className="text-indigo-300 mr-2">💸</span> Entry Fee:
              </span>
              <span className="font-medium text-green-400">₹70</span>
            </p>
          </div>
        </div>

        {/* Rewards section */}
        <div className="mb-5">
          <h4 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center">
            <span className="mr-2">🏆</span> Prize Pool
          </h4>
          <div className="bg-slate-800/60 rounded-lg p-3 border border-slate-700">
            <ul className="text-gray-200 space-y-2">
              {prizeList.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex justify-between py-1.5 px-2 rounded ${
                    idx < 3
                      ? "bg-gradient-to-r from-slate-700/50 to-transparent"
                      : ""
                  }`}
                >
                  <span className="flex items-center font-medium">
                    <span className="mr-2 text-lg">{item.icon}</span>
                    {item.position}
                  </span>
                  <span
                    className={`font-bold ${
                      idx === 0
                        ? "text-yellow-300"
                        : idx === 1
                        ? "text-gray-300"
                        : idx === 2
                        ? "text-amber-600"
                        : "text-indigo-300"
                    }`}
                  >
                    {item.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 mb-5 bg-slate-800/30 p-2 rounded border-l-2 border-yellow-500">
          <span className="text-yellow-500 mr-1">⚠️</span>
          <strong>Note:</strong> 30% TDS will be deducted on your prize net
          profit as per Income Tax regulations.
        </p>

        {/* Action buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-1/2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(slotDetails._id)}
            className="w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-500/30 transition-all duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
