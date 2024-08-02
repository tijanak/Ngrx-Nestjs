import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getProfile() {
    return this.httpClient.get<any>(`${environment.API_URL}auth/profile`);
  }
  login(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.API_URL}auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
