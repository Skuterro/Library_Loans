import axiosClient from "./axiosClient";
import type { ReaderCreateDto } from "../models/reader/ReaderCreateDto"
import type { ReaderDto } from "../models/reader/ReaderDto";
import type { LoanDto } from "../models/loan/LoanDto";
import type { PagedResult } from "../models/PagedResult";

interface ReaderQueryParams {
  pageNumber?: number;
  pageSize?: number;
  email?: string;
}

export const getAllReaders = async (
  params: ReaderQueryParams
): Promise<PagedResult<ReaderDto>> => {
  const query = new URLSearchParams();

  if (params.pageNumber) {
    query.append("pageNumber", params.pageNumber.toString());
  }
  if (params.pageSize) {
    query.append("pageSize", params.pageSize.toString());
  }
  if (params.email && params.email.trim() !== "") {
    query.append("email", params.email);
  }
  //console.log(query.toString());
  const response = await axiosClient.get(`/api/readers?${query.toString()}`);
  return response.data;
};

export const getReaderLoans = async(readerId: number) : Promise<LoanDto[]> => {
  const response = await axiosClient.get(`/api/readers/${readerId}/loans`);
  return response.data;
}

export const createReader = async(readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.post('/api/readers', readerData);
  return response.data;
};

export const updateReader = async(readerId:number, readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.put(`/api/readers/${readerId}`, readerData);
  return response.data;
};

export const deleteReader = async(readerId: number): Promise<void> => {
  await axiosClient.delete(`/api/readers/${readerId}`);
};

