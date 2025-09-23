import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { appSchedule } from '../../models/appointmentScedule/appointmentSchedule';
import { PaymentService } from '../../services/paymentService/payment.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { response } from '../../models/response/response';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-appointment-schedule',
  standalone: false,
  templateUrl: './appointment-schedule.component.html',
  styleUrl: './appointment-schedule.component.css'
})
export class AppointmentScheduleComponent implements OnInit{


  public allDates!:string[];
  public selectedDate!:string | null;
  private response!:response;
  public appointments!:appSchedule[];
  private userID!:string | null;
  constructor(private appointmentService:AppointmentService
   ,private activatedRoute:ActivatedRoute
   ,private toastr:ToastrService
   ,private router:Router
   ,private datePipe : DatePipe){
  }
  
  
  ngOnInit(): void {
    //month is 0 based
    this.selectedDate = this.datePipe.transform(new Date() , 'yyyy-MM-dd');
    this.userID = this.activatedRoute.snapshot.paramMap.get('userId');
    this.appointmentService.GetdoctorAppointments(this.userID , this.selectedDate).subscribe((apps)=>{
      this.appointments = apps;
    })
    this.appointmentService.getAllDates().subscribe((dates) => this.allDates = dates);
  }


  updateApps(date:string | null){ 
    this.appointmentService.GetdoctorAppointments(this.userID , date).subscribe((apps)=>{
      this.appointments = apps;
    })
  }

  modifyAppStatus(appId:string , newStatus:string){
    this.appointmentService.modifyAppointmentStatus(appId ,newStatus ).subscribe((resp)=>{
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
