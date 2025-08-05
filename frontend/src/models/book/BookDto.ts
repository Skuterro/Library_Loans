import type { ReaderDto } from "../reader/ReaderDto";

export interface BookDto {
    id: number;
    title: string;
    author: string;
    releaseYear: number;
    loanedBy: ReaderDto | null;
    loanDate: string | null;
}