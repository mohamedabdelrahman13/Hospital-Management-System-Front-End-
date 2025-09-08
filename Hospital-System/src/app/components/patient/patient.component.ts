import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PatientService } from '../../services/PatientService/patient.service';
import { Subscription } from 'rxjs';
import { patient } from '../../models/patient-model/patient';
@Component({
  selector: 'app-patient',
  standalone: false,
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent{
 
}
