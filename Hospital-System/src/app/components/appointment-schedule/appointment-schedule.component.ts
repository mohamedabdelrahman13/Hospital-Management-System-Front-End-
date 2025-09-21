import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';
import { PaymentService } from '../../services/paymentService/payment.service';
import { ActivatedRoute } from '@angular/router';
import { response } from '../../models/response/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-schedule',
  standalone: false,
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.css'
})
export class AppointmentScheduleComponent implements OnInit{

  private response!:response;
  public appointments!:appSchedule[];
  private userID!:string | null;
  constructor(private appointmentService:AppointmentService
   ,private activatedRoute:ActivatedRoute
   ,private toastr:ToastrService){
  }
  
  
  ngOnInit(): void {

    this.userID = this.activatedRoute.snapshot.paramMap.get('userId');
    this.appointmentService.GetdoctorAppointments(this.userID).subscribe((apps)=>{
      this.appointments = apps;
      console.log(this.appointments);
    })
  }




  markCompleted(appId : string){
    this.appointmentService.markAsCompleted(appId).subscribe((resp)=>{
      this.response = resp;
      if(this.response.statusCode === 200){
        this.toastr.success(`${this.response.message}`);
      }
      else if(this.response.statusCode === 400){
        this.toastr.error(`${this.response.message}`);
      }
    })
  }

  markCancelled(appId : string){
    this.appointmentService.markAsCancelled(appId).subscribe((resp)=>{
      this.response = resp;
      if(this.response.statusCode === 200){
        this.toastr.success(`${this.response.message}`);
      }
      else if(this.response.statusCode === 400){
        this.toastr.error(`${this.response.message}`);
      }
    })
  }
}
