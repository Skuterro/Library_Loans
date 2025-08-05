import type { BookDto } from "../../models/book/BookDto";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { formatDate } from "../../utils/formatDate";

interface BookItemProps {
	book: BookDto;
	onDelete: (bookId: number) => void;
	onEdit: (book: BookDto) => void;
}

export const BookItem = ({ book, onDelete, onEdit}: BookItemProps) => {
  return(
		<li
			key={book.id}
			className="group p-4 bg-gray-800 border-blue-300 border-2 rounded shadow-sm flex items-center gap-4 transition duration-300 ease-in-out hover:scale-105"
		>
			<GiBookmarklet className="text-6xl text-gray-300" />
			<div className="flex-1">
				<p className="font-bold text-lg text-white">
					{book.title} 
				</p>
				<p className="text-sm text-gray-300">
					Author: {book.author ? book.author : 'Unknown'}
				</p>
				<p className="text-sm text-gray-300">Published in {book.releaseYear}</p>
				<p className="text-sm text-gray-300">
					{book.loanedBy ? `Loaned by: ${book.loanedBy.name} ${book.loanedBy.lastName}` : "In Library"}
				</p>
				{book.loanDate ? <p className="text-sm text-gray-300">Loaned: {formatDate(book.loanDate)}</p> : null}
			</div>
			<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<button className="text-blue-500 hover:text-blue-700" onClick={() => onEdit(book)}>
					<FaEdit className="text-xl" />
				</button>
				<button className="text-red-500 hover:text-red-700" onClick={() => onDelete(book.id)}>
					<FaTrashAlt className="text-xl" />
				</button>
			</div>
		</li>
	)
}