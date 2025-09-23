import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
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
import { ReportComponent } from './components/report/report.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  //canActivate = runs when entering hospital-system only ,
  //canActivateChild = runs when entering any child of hospital-system
  {
    path: 'hospital-system', component: SidebarComponent, canActivateChild: [authGuard], children: [

      {
        path: 'patient', component: PatientComponent, canActivate: [roleGuard], data: { roles: ["Staff"] }, children: [
          { path: '', pathMatch: 'full', redirectTo: 'create-Patient' },
          { path: 'create-Patient', component: CreatePatientComponent },
          { path: 'search-Patient', component: SearchPatientComponent }
        ]
      },

      { path: 'manageUsers', component: UserDetailsComponent, canActivate: [roleGuard], data: { roles: ["Admin"] } },
      { path: 'report', component: ReportComponent, canActivate: [roleGuard], data: { roles: ["Admin"] } },
      { path: 'patient-details/:patientId', component: PatientDetailsComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'register', component: RegisterComponent, canActivate: [roleGuard], data: { roles: ["Admin"] } },
      { path: 'edit-patient/:id', component: EditPatientComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'dashboard', component: DashboardComponent, canActivate: [roleGuard], data: { roles: ["Admin"] } },
      { path: 'app-Schedule/:userId', component: AppointmentScheduleComponent, canActivate: [roleGuard], data: { roles: ["Doctor"] } },
      { path: 'doctor', component: DoctorComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'doctor/:patientId', component: DoctorComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'appointment/:patientId/:doctorId', component: AppointmentComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'addDoctor', component: AddDoctorComponent, canActivate: [roleGuard], data: { roles: ["Admin"] } },
      { path: 'checkout', component: CheckoutComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: 'card-payment', component: CardPaymentComponent, canActivate: [roleGuard], data: { roles: ["Staff"] } },
      { path: '', pathMatch: 'full', redirectTo: 'hospital-system' },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
