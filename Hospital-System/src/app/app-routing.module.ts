import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DepartmentComponent } from './components/department/department.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {path: 'hospital-system' , component:SidebarComponent , children:[
    {path: 'patient', component: PatientComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'create-Patient' },
      { path: 'create-Patient', component: CreatePatientComponent },
      { path: 'search-Patient', component: SearchPatientComponent }
    ]
  },

  { path: 'edit-patient/:id', component: EditPatientComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'doctor/:patientId', component: DoctorComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'appointment/:patientId/:doctorId', component: AppointmentComponent },
  { path: 'addDoctor', component: AddDoctorComponent },
  
  ]},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
