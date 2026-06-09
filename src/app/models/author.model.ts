import { Book } from "./book.model";

export interface Author {
    id?: string;
    name: string;
    nationality: string;
    books?: Book[];
    active: boolean; 
}