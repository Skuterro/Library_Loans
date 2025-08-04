import type { ReaderDto } from "../../models/reader/ReaderDto";
import { FaEdit, FaTrashAlt , FaUserCircle } from "react-icons/fa";
import { PiBooksFill } from "react-icons/pi";
import { LuBookPlus } from "react-icons/lu";

interface ReaderItemProps {
  reader: ReaderDto;
  onDelete: (readerId: number) => void;
  onEdit: (reader: ReaderDto) => void;
  onViewLoans: (reader: ReaderDto) => void;
  onLoanBook: (reader: ReaderDto) => void;
}

export const ReaderItem = ({ reader, onDelete, onEdit, onViewLoans, onLoanBook }: ReaderItemProps) => {
  return(
    <li
      key={reader.id}
      className="group p-4 bg-gray-800 border-blue-300 border-2 rounded shadow-sm flex items-center gap-4 transition duration-300 ease-in-out hover:scale-105"
    >
      <FaUserCircle className="text-6xl text-gray-300" />
      <div className="flex-1">
        <p className="font-bold text-lg text-white">
          {reader.name} {reader.lastName}
        </p>
        <p className="text-sm text-gray-300">{reader.email}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-blue-500 hover:text-blue-700" onClick={() => onViewLoans(reader)}>
          <PiBooksFill className="text-xl" />
        </button>
        <button className="text-blue-500 hover:text-blue-700" onClick={() => onLoanBook(reader)}>
          <LuBookPlus className="text-xl" />
        </button>
        <button className="text-blue-500 hover:text-blue-700" onClick={() => onEdit(reader)}>
          <FaEdit className="text-xl" />
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={() => onDelete(reader.id)}>
          <FaTrashAlt className="text-xl" />
        </button>
      </div>
    </li>
	)
}