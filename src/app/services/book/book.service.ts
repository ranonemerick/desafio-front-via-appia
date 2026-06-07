import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private readonly  API_URL = environment.apiUrl;

  createBook(book : any) : Observable<any>{
    return this.http.post(`${this.API_URL}/book`, book);
  }

  getBooks(page: number = 0, size: number = 10) : Observable<any> {
    return this.http.get<Book[]>(`${this.API_URL}/book?page=${page}&size=${size}`)
  }

  getBookById(id: string) : Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/book/${id}`)
  }

  getBooksByParam(title: string, gender: string, year: number, authorName: string, page: number = 0, size: number = 10) : Observable<any> {
    return this.http.get<any>(
      `${this.API_URL}/book/params?title=${title}&gender=${gender}&year=${year}&authorName=${authorName}&page=${page}&size=${size}`)
  }

  getBooksByActive(page: number = 0, size: number = 10) : Observable<any> {
    return this.http.get<any>(`${this.API_URL}/book/active?page=${page}&size${size}`);
  }

}
