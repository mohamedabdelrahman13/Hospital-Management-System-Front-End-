import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/PatientService/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-patient',
  standalone: false,
  templateUrl: './create-patient.component.html',
  styleUrl: './create-patient.component.css'
})
export class CreatePatientComponent implements OnInit{

  addPatientForm!:FormGroup;

  constructor(private patientService:PatientService 
    ,private fb : FormBuilder,
    private toastr: ToastrService,
    private router:Router) {}




  ngOnInit(): void {
    this.addPatientForm = this.fb.group({
      name : ['' , [Validators.required , Validators.maxLength(60) , Validators.minLength(5)]],
      birthDate : ['' , Validators.required],
      gender : ['Male' , Validators.required],
      phone : ['' , [Validators.required ,  Validators.pattern(/^[0-9]{11}$/)]]
    })
  }


  OnSubmit(){
    if(this.addPatientForm.valid){
       this.patientService.addPatient(this.addPatientForm.value)
      .subscribe({
        next:(res) => {
           this.toastr.success('Patient Added Successfully !' , 'Done!');
           this.router.navigateByUrl('/patient/search-Patient')
          },
        error:(err) => {console.log(err) ; this.toastr.error('error adding the patient')}
      })
    }
  }




}
