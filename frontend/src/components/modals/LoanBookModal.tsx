import type { ReaderDto } from "../../models/reader/ReaderDto";
import type { SimpleBookDto } from "../../models/book/SimpleBookDto";
import { useEffect, useState } from "react";
import { getAvailableBooks } from "../../api/bookService";
import { loanBook } from "../../api/loanService";
import { FaBook } from "react-icons/fa";
import { GiBookmarklet } from "react-icons/gi";
import { toast } from "react-hot-toast";

interface LoanBookModalProps {
  reader: ReaderDto;
}

export const LoanBookModal = ({ reader }: LoanBookModalProps) => {
  const [availableBooks, setAvailableBooks] = useState<SimpleBookDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAvailableBooks = async () => {
    setIsLoading(true);
    try {
      const books = await getAvailableBooks();
      setAvailableBooks(books);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoan = async (bookToLoanId: number) => {
    await loanBook({ readerId: reader.id, bookId: bookToLoanId });
    setAvailableBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookToLoanId),
    );
    toast.success("Book loaned successfully!");
  };

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Loan a book:</h2>
      {isLoading ? (
        <p>Loading available books...</p>
      ) : availableBooks.length > 0 ? (
        <ul className="flex flex-col gap-4 w-full">
          {availableBooks.map((book) => (
            <li
              key={book.id}
              className="p-3 bg-gray-700 rounded-md shadow-sm flex flex-row items-center justify-between gap-2 text-center w-full transform transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <GiBookmarklet className="text-5xl text-gray-400" />
                <p className="font-bold text-lg text-white text-left">
                  {book.title}
                </p>
              </div>
              <button
                onClick={() => handleLoan(book.id)}
                className="px-3 py-1 bg-green-500 hover:bg-green-700 text-white rounded-md flex items-center gap-2 font-semibold transition-colors justify-center"
              >
                <FaBook />
                Loan
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books in library.</p>
      )}
    </div>
  );
};
