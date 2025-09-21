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

  GetdoctorAppointments(id:string | null){
    return this.http.get<appSchedule[]>(`${environment.apiUrl}/api/Appointment/GetAppointmentByUserId/${id}`);
  }
  markAsCompleted(id:string | null){
    return this.http.post<response>(`${environment.apiUrl}/api/Appointment/MarkCompleted/${id}` , '');
  }
  markAsCancelled(id:string | null){
    return this.http.post<response>(`${environment.apiUrl}/api/Appointment/MarkCancelled/${id}` , '');
  }
}
