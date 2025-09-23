import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { login } from '../../models/login/login';
import { jwtDecode } from 'jwt-decode';
import { register } from '../../models/register/register';
import { BehaviorSubject } from 'rxjs';
import { decodedToken } from '../../models/decode/decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'auth_token';

  checkRoles = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient
    ,private toastr:ToastrService
    ,private router:Router) { }
  
    $checkRoles() {
      return this.checkRoles.asObservable();
    }
  
  login(login: login) {
    return this.http.post<string>(`${environment.apiUrl}/api/Account/Login`, login);
  }

  getRoles() {
    return this.http.get<any>(`${environment.apiUrl}/api/Account/GetRoles`);
  }

  register(registerData: register) {
    return this.http.post<register>(`${environment.apiUrl}/api/Account/Register`, registerData);
  }

  saveToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }



  getUserEmail(): string | null{
    const token = this.getToken();
    if(!token)
       return null;

    const decodedToken : any = jwtDecode(token);

    if(decodedToken.email != null)
      return decodedToken.email;
    return null;
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded: any = jwtDecode(token);
    // check if the (decoded) const is an array of strings or only one string 
    if (Array.isArray(decoded.roles)) {
      return decoded.roles
    }

    return [decoded.roles]
  }


  //check if the token is expired...
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

      const decoded:any = jwtDecode(token);
      const expiry = decoded.exp * 1000; // convert seconds to ms
      return Date.now() > expiry;
  }

  logoutWithExpiry(): void {
    this.logout();
    this.toastr.warning('Login session has expired');
    this.router.navigate(['/login']);
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';
    const decoded: decodedToken = jwtDecode(token);
    return decoded.Id;
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
  }

  isInRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }


}


