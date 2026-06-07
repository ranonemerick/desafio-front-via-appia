import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${this.API_URL}/author?page=${page}&size=${size}`);
  }

  getAuthorsByActive(page: number, size: number): Observable<any> {
    return this.http.get(`${this.API_URL}/author/active?page=${page}&size=${size}`);
  }

  getAuthorById(id: string) : Observable<any> {
    return this.http.get(`${this.API_URL}/author/${id}`);
  }

  getAuthorsByParams(name: string, nationality: string, page: number, size: number) {
    return this.http.get(`${this.API_URL}/author/params?name=${name}&nationality=${nationality}&page=${page}&size${size}`);
  }

}


