import type { SimpleBookDto } from "./SimpleBookDto";

export interface ReaderDto {
  id: number;
  name: string;
  lastName: string;
  email: string;
  loanedBooks: SimpleBookDto[];
}