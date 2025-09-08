import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { appointmentViewModel } from '../../viewModels/Appointment/appointmentViewModel';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient) { }

  bookAppointment(appoin:appointmentViewModel){
    return this.http.post(`${environment.apiUrl}/api/Appointment/BookAppointment` , appoin);
  }
}
