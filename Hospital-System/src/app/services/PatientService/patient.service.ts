import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { patient } from '../../models/patient-model/patient';
import { environment } from '../../environments/environment';
import { addPatientModel } from '../../models/patient-model/addPatientModel';
import { patientDetailsDTO } from '../../models/patient-model/patientDetailsDTO';
import { response } from '../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http:HttpClient) { }

  getAllPatients(){
    return this.http.get<patient[]>(`${environment.apiUrl}/api/Patient/GetAllPatients`);
  }

  getPatientByID(id:string | null){
    return this.http.get<patientDetailsDTO>(`${environment.apiUrl}/api/Patient/GetPatientByID/${id}`);
  }

  EditPatient(patientDTO:addPatientModel){
    return this.http.put(`${environment.apiUrl}/api/Patient/EditPatient` , patientDTO)
  }

  searchPatientsByName(query:string){
    return this.http.get<response>(`${environment.apiUrl}/api/Patient/SearchPatientsByName/${query}`);
  }

  addPatient(patient:addPatientModel){
    return this.http.post(`${environment.apiUrl}/api/Patient/AddPatient` , patient);
  }
}
