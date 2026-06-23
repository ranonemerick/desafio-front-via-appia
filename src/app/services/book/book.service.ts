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

getBooksByParams(title: string, gender: string, year: number | null, authorName: string, page: number = 0, size: number = 10, sort: string = 'title,asc'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (title && title.trim() !== '') params = params.set('title', title.trim());
    if (gender && gender.trim() !== '') params = params.set('gender', gender.trim());
    if (year) params = params.set('year', year.toString());
    if (authorName && authorName.trim() !== '') params = params.set('authorName', authorName.trim());
  
    return this.http.get<any>(`${this.API_URL}/book/params`, { params });
  }

  getBooksByActive(page: number = 0, size: number = 10, sort: string = 'title,asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort)

    return this.http.get<any>(`${this.API_URL}/book/active`, { params });
  }

  updateBook(id: string, book: any): Observable<any> {
    return this.http.put(`${this.API_URL}/book/${id}`, book)
  }

  deleteBook(id: string) : Observable<any> {
    return this.http.delete(`${this.API_URL}/book/${id}`);
  }

}
