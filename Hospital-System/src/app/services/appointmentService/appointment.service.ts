import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { appointmentViewModel } from '../../viewModels/Appointment/appointmentViewModel';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  bookAppointment(appoin:appointmentViewModel){
    return this.http.post(`${environment.apiUrl}/api/Appointment/BookAppointment` , appoin);
  }

  GetdoctorAppointments(id:string){
    return this.http.get<appSchedule[]>(`${environment.apiUrl}/api/Appointment/GetAppointmentByUserId/${id}`);
  }
}
