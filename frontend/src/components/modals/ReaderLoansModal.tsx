import type { ReaderDto } from "../../models/reader/ReaderDto";
import type { LoanDto } from "../../models/loan/LoanDto";
import { GiBookmarklet } from "react-icons/gi";
import { FaUndo } from "react-icons/fa";
import { returnBook } from "../../api/loanService";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { getReaderLoans } from "../../api/readerService";


interface LoansModalProps {
    reader: ReaderDto;
}

export const ReaderLoansModal = ({ reader }: LoansModalProps) => {
  const [loans, setLoans] = useState<LoanDto[]>([]);
	const [isLoading, setIsLoading] = useState(true);

  const fetchLoanedBooks = async () => {
    setIsLoading(true);
    try{
      const data = await getReaderLoans(reader.id);
      setLoans(data);
    }finally{
      setIsLoading(false);
    }
  };

	const handleReturn = async(loanId: number) => {
		await returnBook(loanId);
		setLoans(prevLoans => prevLoans.filter(loan => loan.id !== loanId));
		toast.success("Book returned to library!");
	}

	useEffect(() => {
    fetchLoanedBooks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Books loaned by {reader.name} {reader.lastName}</h2>
        {isLoading ? (<p>Loading loaned books...</p>) : loans.length > 0 ? (
        <ul className="flex flex-col gap-4 w-full">
          {loans.map(loan => (
            <li key={loan.id} className="p-3 bg-gray-700 rounded-md shadow-sm flex flex-row items-center justify-between gap-2 text-center w-full transform transition-transform hover:scale-105">
              <div className="flex items-center gap-2">
                <GiBookmarklet className="text-5xl text-gray-400" />
                <p className="font-bold text-lg text-white text-left">{loan.book.title}</p>
              </div>
              <button 
                onClick={() => handleReturn(loan.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 font-semibold transition-colors justify-center"
              >
								<FaUndo />
								Return
              </button>				
            </li>
          ))}
        </ul>
        	) : (
            <p>No loaned books.</p>
          )}
    </div>
	);
};