import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  getAuthors(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.API_URL}/author`, { params });
  }

  getAuthorsByActive(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.API_URL}/author/active`, { params });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/author/${id}`);
  }

  getAuthorsByParams(name: string, nationality: string, page: number, size: number) {
    const params = new HttpParams()
      .set('name', name.toString())
      .set('nationality', nationality.toString())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.API_URL}/author/params`, { params });
  }

}


