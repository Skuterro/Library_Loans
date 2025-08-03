interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export const DeleteModal = ({ onClose, onConfirm, message}: DeleteModalProps) => {
  return (
    <div className="flex flex-col items-center">
    <p className="text-xl mb-4 font-bold">{message}</p>
    <div className="flex justify-center gap-4 mt-6">
        <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded-md font-bold hover:bg-gray-700 transition-colors"
        >
            Cancel
        </button>
        <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-md font-bold hover:bg-red-700 transition-colors"
        >
            Delete
        </button>
      </div>
    </div>
  );
};