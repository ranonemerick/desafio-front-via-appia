import { Author } from './author.model';

export interface Book {
  id?: string;
  title: string;
  gender: string;
  year: number;
  authorId?: string;
  author?: Author; 
  active: boolean;
}