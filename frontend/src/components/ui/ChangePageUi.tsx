import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

interface ChangePageUiProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (currentPage: number) => void;
}

export const ChangePageUi = ({
  currentPage,
  totalPages,
  handlePageChange,
}: ChangePageUiProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <FaArrowAltCircleLeft />
      </button>
      <span className="font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        <FaArrowAltCircleRight />
      </button>
    </div>
  );
};
