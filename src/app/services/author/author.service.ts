import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Author } from '../../models/author.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  createAuthor(author: Author): Observable<any>{
    return this.http.post(`${this.API_URL}/author`, author);
  }

  getAuthors(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.API_URL}/author`, { params });
  }

  getAuthorsByActive(page: number, size: number, sort : string = 'name,asc'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
    return this.http.get(`${this.API_URL}/author/active`, { params });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/author/${id}`);
  }

  getAuthorsByParams(name: string, nationality: string, page: number, size: number, sort: string = 'name,asc') {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);
      
      if (name && name.trim() !== '') params = params.set('name', name.trim());
      if (nationality && nationality.trim() !== '') params = params.set('nationality', nationality.trim());
    
    return this.http.get(`${this.API_URL}/author/params`, { params });
  }

  updateAuthor(id: string, author: any) : Observable<any> {
    return this.http.put(`${this.API_URL}/author/${id}`, author);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/author/${id}`);
  }

}