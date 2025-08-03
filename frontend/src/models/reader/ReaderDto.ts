import type { SimpleBookDto } from "../book/SimpleBookDto"

export interface ReaderDto {
  id: number;
  name: string;
  lastName: string;
  email: string;
  loanedBooks: SimpleBookDto[];
}