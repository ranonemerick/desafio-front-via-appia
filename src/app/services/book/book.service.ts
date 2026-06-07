import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  createBook(book: any): Observable<any> {
    return this.http.post(`${this.API_URL}/book`, book);
  }

  getBooks(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Book[]>(`${this.API_URL}/book`, { params })
  }

  getBookById(id: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/book/${id}`)
  }

  getBooksByParam(title: string, gender: string, year: number, authorName: string, page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('title', title.toString())
      .set('gender', gender.toString())
      .set('year', year.toString())
      .set('authorName', authorName.toString())
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.API_URL}/book/params`, { params });
  }

  getBooksByActive(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.API_URL}/book/active`, { params });
  }

  updateBook(id: string, book: any): Observable<any> {
    return this.http.put(`${this.API_URL}/book/${id}`, book)
  }

  deleteBook(id: string) : Observable<any> {
    return this.http.delete(`${this.API_URL}/book/${id}`);
  }

}
