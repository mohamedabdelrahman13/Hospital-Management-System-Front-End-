import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { department } from '../../models/department/department';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  searchDepartments(query:string){
   return this.http.get<department>(`${environment.apiUrl}/api/Department/SearchDepartment/${query}`);
  }
  getAllDepts(){
     return this.http.get<department[]>(`${environment.apiUrl}/api/Department/GetAllDepartments`);
  }
}
