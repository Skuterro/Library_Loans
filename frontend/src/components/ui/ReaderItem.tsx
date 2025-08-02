import { useState } from "react";
import type { ReaderDto } from "../../models/ReaderDto";
import { FaEdit, FaTrashAlt , FaUserCircle } from "react-icons/fa";

interface ReaderItemProps {
  reader: ReaderDto;
}

export const ReaderItem = ({ reader }: ReaderItemProps) => {
  return(
    <li
      key={reader.id}
      className="group p-4 bg-gray-800 border-blue-300 border-2 rounded shadow-sm flex items-center gap-4 transition duration-300 ease-in-out hover:scale-105"
    >
      {/* Sekcja z ikoną użytkownika */}
      <FaUserCircle className="text-6xl text-gray-400" />

      {/* Sekcja z danymi użytkownika */}
      <div className="flex-1">
        <p className="font-bold text-lg text-white">
          {reader.name} {reader.lastName}
        </p>
        <p className="text-sm text-gray-400">{reader.email}</p>
      </div>

      {/* Sekcja z przyciskami (po prawej), która pojawia się po najechaniu */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit className="text-xl" />
        </button>
        <button className="text-red-500 hover:text-red-700">
          <FaTrashAlt className="text-xl" />
        </button>
      </div>
    </li>
	)
}