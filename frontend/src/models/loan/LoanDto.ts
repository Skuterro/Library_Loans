import type { SimpleBookDto } from "../book/SimpleBookDto";
import type { ReaderDto } from "../reader/ReaderDto";

export interface LoanDto {
  id: number;
  book: SimpleBookDto;
  loanedBy: ReaderDto;
  loanDate: string;
  returnDate: string | null;
}
