import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { doctorViewModel } from '../../viewModels/doctor/doctorViewModel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { department } from '../../models/department/department';
import { DepartmentService } from '../../services/DepartmentService/department.service';

@Component({
  selector: 'app-doctor',
  standalone: false,
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit{
  public selectedDepartment:string = 'Medical and Surgical';
  public departments!:department[];
  public doctors!:doctorViewModel[];
  public patientId!:string | null;
  constructor(private doctorService:DoctorService,
    private toastr:ToastrService
    ,private router:Router
    ,private activeatedRoute:ActivatedRoute
    ,private departmentService:DepartmentService){}


    
  ngOnInit(): void {
    this.patientId = this.activeatedRoute.snapshot.paramMap.get('patientId')
    this.doctorService.getAllDoctorsWithProfile(this.selectedDepartment).subscribe({
      next:(docs) => {this.doctors = docs;},
      error:(err) => {this.toastr.error('error retrieving data from server')}
    })

    this.departmentService.getAllDepts().subscribe((depts) => this.departments = depts)
  }


  goToAppointment(doctorId:string){
    this.router.navigateByUrl(`/hospital-system/appointment/${this.patientId}/${doctorId}`);
  }


  updateDoctors(selectedDept:string){
     this.doctorService.getAllDoctorsWithProfile(selectedDept).subscribe({
      next:(docs) => {this.doctors = docs;},
      error:(err) => {this.toastr.error('error retrieving data from server')}
    })

    console.log(this.selectedDepartment)
  }


}
