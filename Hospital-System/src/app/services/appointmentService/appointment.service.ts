import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { appointmentViewModel } from '../../viewModels/Appointment/appointmentViewModel';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';
import { appointmentBookingDTO } from '../../models/AppointmentBookingDTO/appointmentBookingDTO';
import { response } from '../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  bookAppointment(appoin:appointmentBookingDTO){
    return this.http.post(`${environment.apiUrl}/api/Appointment/BookAppointment` , appoin);
  }

  checkAvailability(appoin:appointmentViewModel){
    return this.http.post(`${environment.apiUrl}/api/Appointment/CheckAvailability` , appoin);
  }

  getAllDates(){
    return this.http.get<string[]>(`${environment.apiUrl}/api/Appointment/GetAllAppsDates`);
  }
  GetdoctorAppointments(id:string | null , appDate:string | null){
    return this.http.get<appSchedule[]>(`${environment.apiUrl}/api/Appointment/GetAppointmentByUserId/${id}/${appDate}`);
  }
  modifyAppointmentStatus(appId:string | null , newStatus:string | null){
    return this.http.put<response>(`${environment.apiUrl}/api/Appointment/ModifyAppointmentStatus/${appId}/${newStatus}` , '');
  }
}
