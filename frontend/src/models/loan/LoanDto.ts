import type { SimpleBookDto } from "../book/SimpleBookDto";
import type { SimpleReaderDto } from "../reader/SimpleReaderDto";

export interface LoanDto {
    id: number;
    book: SimpleBookDto;
    loanedBy: SimpleReaderDto;
    loanDate: string;
    returnDate: string | null;
}
