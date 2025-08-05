import type { LoanDto } from "../models/loan/LoanDto"
import { useEffect, useState, useCallback } from "react"
import { useDebounce } from "../utils/useDebounce";
import { getAllLoans } from "../api/loanService";
import { FcApproval } from "react-icons/fc";
import { returnBook } from "../api/loanService";
import { formatDate } from "../utils/formatDate";
import { ChangePageUi } from "../components/ui/ChangePageUi";
import { FaUndo } from "react-icons/fa";
import { toast } from "react-hot-toast";

export const LoansPage = () => {
	const[loans, setLoans] = useState<LoanDto[]>([]);
	const[isLoading, setIsLoading] = useState(true);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [filterReaderEmail, setFilterReaderEmail] = useState("");
	const [filterBookTitle, setFilterBookTitle] = useState("");
	const debouncedEmail = useDebounce(filterReaderEmail, 500);
	const debouncedTitle = useDebounce(filterBookTitle, 500);		

	const fetchLoans = useCallback(async (page: number, email: string, title: string) => {
		try{
			setIsLoading(true);
			const data = await getAllLoans({ 
				pageNumber: page, 
				pageSize: 15, 
				readerEmail: email, 
				bookTitle: title});
			setLoans(data.items);
			setTotalPages(data.totalPages);
		}finally{
			setIsLoading(false);
		}
	}, [])

	const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

	const handleReturn = async(loanId: number) => {
		await returnBook(loanId);
		toast.success("Book returned to library!");
		fetchLoans(currentPage, debouncedEmail, debouncedTitle);
	}

	useEffect(() => {
		fetchLoans(currentPage, debouncedEmail, debouncedTitle);
	}, [currentPage, debouncedEmail, debouncedTitle, fetchLoans]);

	useEffect(() => {
    if(currentPage !== 1){
      setCurrentPage(1);
    }
  }, [debouncedEmail, debouncedTitle]);

	return (
		<section className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Loans</h1>
			  <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by email..."
            value={filterReaderEmail}
            onChange={(e) => setFilterReaderEmail(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
					<input
            type="text"
            placeholder="Filter by title..."
            value={filterBookTitle}
            onChange={(e) => setFilterBookTitle(e.target.value)}
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
			{isLoading ? (
				<p>Loading...</p>
			) : loans.length > 0 ? (
				<div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<table className="min-w-full table-auto text-black">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th className=" px-4 py-2 text-left">Title</th>
								<th className="px-4 py-2 text-left">Loaned by</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left">Loan date</th>
								<th className=" px-4 py-2 text-left">return date</th>
							</tr>
						</thead>
						<tbody>
							{loans.map(loan => (
								<tr key={loan.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
									<td className="px-4 py-2 font-bold text-white">{loan.book.title}</td>
									<td className="px-4 py-2 text-gray-300">{loan.loanedBy.name} {loan.loanedBy.lastName}</td>
									<td className="px-4 py-2 text-gray-300">{loan.loanedBy.email}</td>
									<td className="px-4 py-2 text-gray-300">{formatDate(loan.loanDate)}</td>
									<td className="px-4 py-2 text-gray-300 flex gap-2 items-center">    
										{loan.returnDate ? (
											<>{formatDate(loan.returnDate)} <FcApproval /></>
										) : (
											<button
												onClick={() => handleReturn(loan.id)}
												className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center gap-2 font-semibold transition-colors justify-center"
											>
												<FaUndo />
												Return
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>No loans...</p>
			)}
      {loans.length > 0 && !isLoading && (
        <ChangePageUi 
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}  
        />
      )}			
		</section>
	);
};