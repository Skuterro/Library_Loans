import type { BookDto } from "../models/book/BookDto"
import type { BookCreateDto } from "../models/book/BookCreateDto";
import type { SimpleBookDto } from "../models/book/SimpleBookDto";
import type { PagedResult } from "../models/PagedResult";
import axiosClient from "./axiosClient";

interface BookQueryParams {
  pageNumber?: number;
  pageSize?: number;
  title?: string;
}

export const getAllBooks = async (
  params: BookQueryParams
): Promise<PagedResult<BookDto>> => {
  const query = new URLSearchParams();

  if (params.pageNumber) {
    query.append("pageNumber", params.pageNumber.toString());
  }
  if (params.pageSize) {
    query.append("pageSize", params.pageSize.toString());
  }
  if (params.title && params.title.trim() !== "") {
    query.append("title", params.title);
  }
  console.log(query.toString());
  const response = await axiosClient.get(`/api/books?${query.toString()}`);
  return response.data;
};

export const getAvailableBooks = async (): Promise<SimpleBookDto[]> => {
  const response = await axiosClient.get('/api/books/available');
  return response.data;
};

export const createBook = async(bookData: BookCreateDto) : Promise<BookDto> => {
  const response = await axiosClient.post('/api/books', bookData);
  return response.data;
};

export const updateBook = async(bookId: number, bookData: BookCreateDto) : Promise<BookDto> => {
  const response = await axiosClient.put(`/api/books/${bookId}`, bookData);
  return response.data;
}

export const deleteBook = async(bookId: number): Promise<void> => {
  await axiosClient.delete(`/api/books/${bookId}`);
};
