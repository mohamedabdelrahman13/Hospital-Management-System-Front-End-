import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { patient } from '../models/patient-model/patient';
import { PatientService } from '../services/PatientService/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-patient',
  standalone: false,
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.css'
})
export class EditPatientComponent implements OnInit {

  // public patientId!:string | null;
  public editPatientForm!: FormGroup;
  public patient: patient = {} as patient;

  constructor(private activatedRoute: ActivatedRoute
    ,private router:Router
    , private patientService: PatientService,
    private fb: FormBuilder
    ,private toastr:ToastrService) { }



  ngOnInit(): void {
    const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editPatientForm = this.fb.group({
      id : [patientId],
      name: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(5)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]]
    })
    
    if (patientId) {
      this.patientService.getPatientByID(patientId).subscribe((pat) => {
        this.patient = pat
        this.editPatientForm.patchValue(this.patient);
      });

    }


  }

  OnSubmit() {
    this.patientService.EditPatient(this.editPatientForm.value)
    .subscribe({
      next:(response) => {
        this.toastr.success('updated Successfully !' , 'Updated');
        this.router.navigateByUrl('/patient/search-Patient');
      }
    }
    )
  }


}
