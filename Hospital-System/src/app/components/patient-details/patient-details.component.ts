import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/PatientService/patient.service';
import { patient } from '../../models/patient-model/patient';
import { patientDetailsDTO } from '../../models/patient-model/patientDetailsDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: false,
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit{

  private patientId!:string | null;
  public patient!:patientDetailsDTO;
constructor(private patientService:PatientService
  ,private route:ActivatedRoute){

}

  ngOnInit(): void {

    this.patientId = this.route.snapshot.paramMap.get('patientId'); 


    this.patientService.getPatientByID(this.patientId).subscribe((pat) =>{
      this.patient = pat;
      console.log(this.patient);
    });
  }


}
