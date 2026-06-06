import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private readonly  API_URL = environment.apiUrl;

  getBooks(page: number = 0, size: number = 10) : Observable<any> {
    return this.http.get<Book[]>(`${this.API_URL}/book?page=${page}&size=${size}`)
  }

  getBookById(id: string) : Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/book/${id}`)
  }
}
