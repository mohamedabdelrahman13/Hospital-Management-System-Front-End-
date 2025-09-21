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

  getAllDoctorsWithoutProfile(){
    return this.http.get<doctorViewModel[]>(`${environment.apiUrl}/api/Doctor/GetAllDoctorsWithoutProfile`);
  }

  getAllDoctorsWithProfile(speciality:string){
    return this.http.get<doctorViewModel[]>(`${environment.apiUrl}/api/Doctor/GetAllDoctorsWithProfile/${speciality}`);
  }

  // getDoctorById(id:string | null){
  //   return this.http.get<doctorViewModel>(`${environment.apiUrl}/api/Doctor/GetDoctorById/${id}`);
  // }

  getDoctorByUserId(id:string | null){
    return this.http.get<doctorViewModel>(`${environment.apiUrl}/api/Doctor/GetDoctorByUserID/${id}`);
  }

  addDoctor(doctor:addDoctor){
    return this.http.post(`${environment.apiUrl}/api/Doctor/AddDoctor` , doctor);
  }
}
