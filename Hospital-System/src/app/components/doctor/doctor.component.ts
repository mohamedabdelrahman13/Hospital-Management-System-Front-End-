import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { UserViewModel } from '../../viewModels/user/userViewModel';
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
  public doctors!:UserViewModel[];
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
    if(this.patientId){
    this.router.navigateByUrl(`/hospital-system/appointment/${this.patientId}/${doctorId}`);
    }
    else{
      this.toastr.info('Please choose the patient first')
    }
  }


  updateDoctors(selectedDept:string){
     this.doctorService.getAllDoctorsWithProfile(selectedDept).subscribe({
      next:(docs) => {this.doctors = docs;},
      error:(err) => {this.toastr.error('error retrieving data from server')}
    })
  }


}
