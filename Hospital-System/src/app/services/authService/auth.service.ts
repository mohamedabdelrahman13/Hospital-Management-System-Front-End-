import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { login } from '../../models/login/login';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  login(login: login) {
    return this.http.post<string>(`${environment.apiUrl}/api/Account/Login`, login);
  }


  
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }



  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded: any = jwtDecode(token);

    console.log(decoded);
    // check if the (decoded) const is an array of strings or only one string 
    if(Array.isArray(decoded.roles)){
      return decoded.roles 
    }

    return [decoded.roles]
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }


  isInRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }
  
}


