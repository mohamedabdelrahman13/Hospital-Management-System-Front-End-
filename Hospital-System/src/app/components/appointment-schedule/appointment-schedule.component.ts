import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';

@Component({
  selector: 'app-appointment-schedule',
  standalone: false,
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.css'
})
export class AppointmentScheduleComponent implements OnInit{
  public appointments!:appSchedule[]
  constructor(private appointmentService:AppointmentService){
  }
  
  id = '67de36b9-ab94-4c31-b888-96f58755df5c'
  
  ngOnInit(): void {
    this.appointmentService.GetdoctorAppointments(this.id).subscribe((apps)=>{
      this.appointments = apps;
    })
  }


}
