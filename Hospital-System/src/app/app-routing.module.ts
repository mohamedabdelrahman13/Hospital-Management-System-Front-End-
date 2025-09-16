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
import { AppointmentScheduleComponent } from './components/appointment-schedule/appointment-schedule.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CardPaymentComponent } from './components/card-payment/card-payment.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent},
  
  {path: 'hospital-system' , component:SidebarComponent , canActivate:[authGuard] , children:[
    {path: 'patient', component: PatientComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'create-Patient' },
      { path: 'create-Patient', component: CreatePatientComponent },
      { path: 'search-Patient', component: SearchPatientComponent }
    ]
  },


  { path: 'patient-details/:patientId', component: PatientDetailsComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'edit-patient/:id', component: EditPatientComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'app-Schedule', component: AppointmentScheduleComponent},
  { path: 'doctor', component: DoctorComponent},
  { path: 'doctor/:patientId', component: DoctorComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'appointment/:patientId/:doctorId', component: AppointmentComponent },
  { path: 'addDoctor', component: AddDoctorComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'card-payment', component: CardPaymentComponent},
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  
  ]},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
