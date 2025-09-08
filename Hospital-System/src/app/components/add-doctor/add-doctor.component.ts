import { Component, OnInit } from '@angular/core';
import { department } from '../../models/department/department';
import { DepartmentService } from '../../services/DepartmentService/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-doctor',
  standalone: false,
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css'
})
export class AddDoctorComponent implements OnInit {
  addDoctorForm!: FormGroup;
  public departments!: department[]

  constructor(private deptService: DepartmentService
    , private fb: FormBuilder
    , private doctorService: DoctorService
    , private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.addDoctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      DepartmentID: ['department', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
      cost: ['', Validators.required]
    })

    this.deptService.getAllDepts().subscribe((depts) => {
      this.departments = depts;
    })

  }

  OnSubmit() {

    // console.log(this.addDoctorForm.value);
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




