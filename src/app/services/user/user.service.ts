import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;  

  registerUser(user : any): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/register`, user);
  }
}
