import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { revenueDTO } from '../../models/revenueDTO/revenueDTO';
import { patientStatsDTO } from '../../models/patientStatsDTO/patientStatsDTO';
import { appointmentStatsDTO } from '../../models/AppointmentStats/AppointmentStatsDTO';
import { deptStatsDTO } from '../../models/DeptStats/deptStats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getPatientsStats(view:string){
    return this.http.get<patientStatsDTO[]>(`${environment.apiUrl}/api/Dashboard/GetPatientsStats/${view}`);
  }
  
  getRevenueStats(view:string){
    return this.http.get<revenueDTO[]>(`${environment.apiUrl}/api/Dashboard/GetRevenueStats/${view}`);
  }

  getAppointmentsStats(view:string){
    return this.http.get<appointmentStatsDTO[]>(`${environment.apiUrl}/api/Dashboard/GetAppointmentsStats/${view}`);
  }

  getDepartmentsStats(){
    return this.http.get<deptStatsDTO[]>(`${environment.apiUrl}/api/Dashboard/GetDepartmentsStats`);
  }

  getTotalStaff(){
    return this.http.get<number>(`${environment.apiUrl}/api/Dashboard/GetTotalStaff`);
  }
  getPatientsNumber(){
    return this.http.get<number>(`${environment.apiUrl}/api/Dashboard/GetPatientsNumber`);
  }
  getAverageCost(){
    return this.http.get<number>(`${environment.apiUrl}/api/Dashboard/GetAverageCost`);
  }

}
