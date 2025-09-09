import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { doctorViewModel } from '../../viewModels/doctor/doctorViewModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: false,
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{
  public doctors!:doctorViewModel[];
  public patientId!:string | null;
  constructor(private doctorService:DoctorService,
    private toastr:ToastrService
    ,private router:Router
    ,private activeatedRoute:ActivatedRoute){}


    
  ngOnInit(): void {
    this.patientId = this.activeatedRoute.snapshot.paramMap.get('patientId')
    this.doctorService.getAllDoctors().subscribe({
      next:(docs) => {this.doctors = docs; console.log(this.doctors) , console.log(this.doctors[1].consultationHours)},
      error:(err) => {this.toastr.error('error retrieving data from server')}
    })
  }


  goToAppointment(doctorId:string){
    this.router.navigateByUrl(`/hospital-system/appointment/${this.patientId}/${doctorId}`);
  }




}
