import { Component, OnInit } from '@angular/core';
import { department } from '../../models/department/department';
import { DepartmentService } from '../../services/DepartmentService/department.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { doctorViewModel } from '../../viewModels/doctor/doctorViewModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {
  public doctorsWithoutProfiles!:doctorViewModel[]
  public addDoctorForm!: FormGroup;
  public departments!: department[]
  public daysOfWeek:string[] = []
  constructor(private deptService: DepartmentService
    , private fb: FormBuilder
    , private doctorService: DoctorService
    , private toastr: ToastrService
    ,private datePipe: DatePipe
  ) {

    this.daysOfWeek = ['saturday' , 'sunday' , 'monday' , 'tuesday' , 'wednesday' , 'thursday' , 'friday' ]
  }
  ngOnInit(): void {
    
    this.addDoctorForm = this.fb.group({
      departmentID: ['department', Validators.required],
      userId:['' , Validators.required],
      cost: ['', Validators.required],
      consultationHourDTOs: this.fb.array([this.createConsultationHour()])
    })

    this.doctorService.getAllDoctorsWithoutProfile().subscribe(d => 
      {
        this.doctorsWithoutProfiles = d;
        console.log(this.doctorsWithoutProfiles)
      });
      
    this.deptService.getAllDepts().subscribe((depts) => {
      this.departments = depts;
    })

  }


  createConsultationHour(): FormGroup {
    return this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }
  

  get consultationHourDTOs(): FormArray{
    return this.addDoctorForm.get('consultationHourDTOs') as FormArray;
  }
  
  addConsultationHour() {
    this.consultationHourDTOs.push(this.createConsultationHour());
      
    console.log(this.addDoctorForm.value);
  }

  removeConsultationHour(index: number) {
    this.consultationHourDTOs.removeAt(index);
  }

  
  formatTime(date: Date): string | null{
    // return date.toLocaleTimeString('en-GB', { hour12: false });
    // if (!date) return '';

    // const hours = date.getHours().toString().padStart(2, '0');
    // const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // return `${hours}:${minutes}:${seconds}`;
    return this.datePipe.transform(date , 'HH:mm:00');
  }


  OnSubmit() {
    const addDoctorValue = this.addDoctorForm.value;

    //convert the date coming from timepicker into date => hh:mm:ss format
    this.consultationHourDTOs.controls.forEach(control => {
      const value = control.value; 
      value.startTime = this.formatTime(value.startTime);
      value.endTime = this.formatTime(value.endTime);
    });

    
    console.log(this.addDoctorForm.value);
    this.doctorService.addDoctor(this.addDoctorForm.value).subscribe({
      next: (Response) => {
        this.toastr.success('Saved Successfully', 'Done');
      },

      error: (err) => {
        console.log(err);
      }
    })
  }
}




