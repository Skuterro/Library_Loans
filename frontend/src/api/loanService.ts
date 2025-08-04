import type { LoanBookDto } from "../models/loan/LoanBookDto";
import type { LoanDto } from "../models/loan/LoanDto";
import axiosClient from "./axiosClient";

export const getAllLoans = async() : Promise<LoanDto[]> => {
  const response = await axiosClient.get('/Loans');
	return response.data;
};

export const loanBook = async(loanBookDto: LoanBookDto): Promise<void> => {
	const response = await axiosClient.post('/Loans', loanBookDto);
	return response.data;
};

export const returnBook = async(loanId: number): Promise<void> => {
	await axiosClient.put(`/return/${loanId}`)
}