import type { BookDto } from "../models/BookDto";
import axiosClient from "./axiosClient";

export const getAllBooks = async (): Promise<BookDto[]> => {
    const response = await axiosClient.get('/Books');
    return response.data;
};
/*
export const createBook = async(bookData: BookCreateDto) : Promise<BookDto> => {
  const response = await axiosClient.post('/Clients', bookData);
  return response.data;
}
*/
export const deleteBook = async(id: number): Promise<void> => {
    await axiosClient.delete(`/Books/${id}`);
};