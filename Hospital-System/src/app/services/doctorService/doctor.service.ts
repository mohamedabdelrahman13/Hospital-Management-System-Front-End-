import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { doctorViewModel } from '../../viewModels/doctor/doctorViewModel';
import { environment } from '../../environments/environment';
import { addDoctor } from '../../models/doctor/addDoctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  getAllDoctors(){
    return this.http.get<doctorViewModel[]>(`${environment.apiUrl}/api/Doctor/GetAllDoctors`);
  }

  getDoctorById(id:string | null){
    return this.http.get<doctorViewModel>(`${environment.apiUrl}/api/Doctor/GetDoctorById/${id}`);
  }

  addDoctor(doctor:addDoctor){
    return this.http.post(`${environment.apiUrl}/api/Doctor/AddDoctor` , doctor);
  }
}
