function Modal({ isOpen, onClose, onConfirm, slotDetails }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 p-6 rounded-lg w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-2xl mb-4">Confirm Booking</h3>
        <div className="text-white mb-4">
          <p>
            <strong>Time:</strong> {slotDetails?.time}
          </p>
          <p>
            <strong>Available Spots:</strong> {10 - slotDetails?.players.length}
            /10
          </p>
          <p className="text-sm text-gray-400">
            By booking, ₹70 will be deducted from your wallet.
          </p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(slotDetails._id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
