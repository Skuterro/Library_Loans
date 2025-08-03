import type { SimpleReaderDto } from "../reader/SimpleReaderDto";

export interface BookDto {
    id: number;
    title: string;
    author: string;
    releaseYear: number;
    loanedBy: SimpleReaderDto | null;
    loanDate: string | null;
}