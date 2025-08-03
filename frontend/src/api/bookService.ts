import type { BookDto } from "../models/book/BookDto"
import axiosClient from "./axiosClient";
import type { BookCreateDto } from "../models/book/BookCreateDto";

export const getAllBooks = async (): Promise<BookDto[]> => {
    const response = await axiosClient.get('/Books');
    return response.data;
};

export const createBook = async(bookData: BookCreateDto) : Promise<BookDto> => {
  const response = await axiosClient.post('/Books', bookData);
  return response.data;
};

export const updateBook = async(bookId: number, bookData: BookCreateDto) : Promise<BookDto> => {
  const response = await axiosClient.put(`/Books/${bookId}`, bookData);
  return response.data;
}

export const deleteBook = async(id: number): Promise<void> => {
    await axiosClient.delete(`/Books/${id}`);
};