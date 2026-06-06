import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "../../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private API_URL = environment.apiUrl;

    login(credentials: {login: string, password: string}) {
        return this.http.post<{token: string}>(`${this.API_URL}/auth/login`, credentials)
        .pipe(
            tap(response => localStorage.setItem('token', response.token))
        );
    }

    isLogged() : boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

}