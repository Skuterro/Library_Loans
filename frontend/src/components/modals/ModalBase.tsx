import { RxCross2 } from "react-icons/rx";

interface ModalProps  {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border-blue-300 border-2 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 animate-pop-up">
        <style>{`
          @keyframes pop-up {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
              opacity: 1;
            }
            100% {
              transform: scale(1);
            }
            }

            .animate-pop-up {
              animation: pop-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
          `}</style>
          <div className="flex justify-end">
            <button onClick={onClose}>
              <RxCross2 className="text-white text-2xl hover:text-red-400 transition-colors "/>
            </button>
          </div>
            {children}
          </div>
      </div>
  );
};
