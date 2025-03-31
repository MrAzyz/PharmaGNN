import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(user: UserRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  validateToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validate-token`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
