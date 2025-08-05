import type { LoanBookDto } from "../models/loan/LoanBookDto";
import type { LoanDto } from "../models/loan/LoanDto";
import type { PagedResult } from "../models/PagedResult";
import axiosClient from "./axiosClient";

interface LoanQueryParams{
	pageNumber?: number;
  pageSize?: number;
	readerEmail?: string;
	bookTitle?: string;
}

export const getAllLoans = async(
	params: LoanQueryParams
) : Promise<PagedResult<LoanDto>> => {
	const query = new URLSearchParams();

	if (params.pageNumber) {
    query.append("pageNumber", params.pageNumber.toString());
  }
  if (params.pageSize) {
    query.append("pageSize", params.pageSize.toString());
  }
  if (params.readerEmail && params.readerEmail.trim() !== "") {
    query.append("readerEmail", params.readerEmail);
  }
	if (params.bookTitle && params.bookTitle.trim() !== "") {
    query.append("bookTitle", params.bookTitle);
  }

  const response = await axiosClient.get(`/api/loans?${query.toString()}`);
	return response.data;
};

export const loanBook = async(loanBookDto: LoanBookDto): Promise<void> => {
	const response = await axiosClient.post('/api/loans', loanBookDto);
	return response.data;
};

export const returnBook = async(loanId: number): Promise<void> => {
	await axiosClient.put(`/api/loans/return/${loanId}`)
}