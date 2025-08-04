import { useEffect, useState } from "react"
import type { LoanDto } from "../models/loan/LoanDto"
import { getAllLoans } from "../api/loanService";
import { FcApproval } from "react-icons/fc";

export const LoansPage = () => {
	const[loans, setLoans] = useState<LoanDto[]>([]);
	const[isLoading, setIsLoading] = useState(true);

	const fetchLoans = async () => {
		try{
			setIsLoading(true);
			const data = await getAllLoans();
			setLoans(data);
		}finally{
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchLoans();
	}, []);

	return (
		<section className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Loans</h1>
			{isLoading ? (
				<p>Loading...</p>
			) : loans.length > 0 ? (
				<div className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<table className="min-w-full table-auto text-black">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th className=" px-4 py-2 text-left">Title</th>
								<th className="px-4 py-2 text-left">Loaned by</th>
								<th className="px-4 py-2 text-left">Loan date</th>
								<th className=" px-4 py-2 text-left">return date</th>
							</tr>
						</thead>
						<tbody>
							{loans.map(loan => (
								<tr key={loan.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
									<td className="px-4 py-2 font-bold text-white">{loan.book.title}</td>
									<td className="px-4 py-2 text-gray-300">{loan.loanedBy.name} {loan.loanedBy.lastName}</td>
									<td className="px-4 py-2 text-gray-300">{new Date(loan.loanDate).toLocaleDateString()}</td>
									<td className="px-4 py-2 text-gray-300 flex gap-2 items-center">    
										{loan.returnDate ? (
											<>{new Date(loan.returnDate).toLocaleDateString()} <FcApproval /></>
										) : (
											'Not returned'
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
		</section>
	);
};