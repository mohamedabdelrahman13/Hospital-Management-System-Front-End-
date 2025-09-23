import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserViewModel } from '../../viewModels/user/userViewModel';
import { environment } from '../../environments/environment';
import { response } from '../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  filterUsers(query:string){
    return this.http.get<response>(`${environment.apiUrl}/api/Account/FilterUsers/${query}`);
  }

  updateUserStatus(userId:string , newState:string){
    return this.http.put<response>(`${environment.apiUrl}/api/Account/UpdateUser/${userId}/${newState}` , '');
  }
}
