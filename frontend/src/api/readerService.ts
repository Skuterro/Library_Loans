import axiosClient from "./axiosClient";
import type { ReaderCreateDto } from "../models/reader/ReaderCreateDto"
import type { ReaderDto } from "../models/reader/ReaderDto";
import type { LoanDto } from "../models/loan/LoanDto";

export const getAllReaders = async (): Promise<ReaderDto[]> => {
  const response = await axiosClient.get('/Readers');
  return response.data;
};

export const getReaderLoans = async(readerId: number) : Promise<LoanDto[]> => {
  const response = await axiosClient.get(`/Readers/${readerId}/loans`);
  return response.data;
}

export const createReader = async(readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.post('/Readers', readerData);
  return response.data;
};

export const updateReader = async(readerId:number, readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.put(`/Readers/${readerId}`, readerData);
  return response.data;
};

export const deleteReader = async(readerId: number): Promise<void> => {
  await axiosClient.delete(`/Readers/${readerId}`);
};

