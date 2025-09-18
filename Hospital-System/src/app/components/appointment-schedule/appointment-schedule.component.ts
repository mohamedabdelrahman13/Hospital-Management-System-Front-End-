import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';
import { PaymentService } from '../../services/paymentService/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-schedule',
  standalone: false,
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.css'
})
export class AppointmentScheduleComponent implements OnInit{
  public appointments!:appSchedule[];
  private userID!:string | null;
  constructor(private appointmentService:AppointmentService
   ,private activatedRoute:ActivatedRoute){
  }
  
  
  ngOnInit(): void {

    this.userID = this.activatedRoute.snapshot.paramMap.get('userId');
    this.appointmentService.GetdoctorAppointments(this.userID).subscribe((apps)=>{
      this.appointments = apps;
    })
  }


}
