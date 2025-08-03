import axiosClient from "./axiosClient";
import type { ReaderCreateDto } from "../models/reader/ReaderCreateDto"
import type { ReaderDto } from "../models/reader/ReaderDto";

export const getAllReaders = async (): Promise<ReaderDto[]> => {
  const response = await axiosClient.get('/Clients');
  return response.data;
};

export const createReader = async(readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.post('/Clients', readerData);
  return response.data;
}

export const updateReader = async(id:number, readerData: ReaderCreateDto) : Promise<ReaderDto> => {
  const response = await axiosClient.put(`/Clients/${id}`, readerData);
  return response.data;
}

export const deleteReader = async(id: number): Promise<void> => {
  await axiosClient.delete(`/Clients/${id}`);
};