import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


const API_USERS_URL = `${environment.apiUrl}`;  ///auth

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  constructor(private http: HttpClient) { }

  // public methods
  login(email: string, password: string): Observable<any> {
    const headers = {
      Accept: 'application/vnd.pardos.v1+json',
      'Content-Type': 'application/json',
    };
    let datalogin = this.http.post<any>(`${API_USERS_URL}/token`, {
      email,
      password,
    }, { headers });
    console.log(datalogin);
    return datalogin;
  }

  getUserByToken(token: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.pardos.v1+json',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${API_USERS_URL}/me`, {
      headers: httpHeaders,
    });
  }
}
