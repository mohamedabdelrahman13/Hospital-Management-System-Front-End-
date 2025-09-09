import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TimePipe } from './Pipes/time.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertComponent , AlertModule } from 'ngx-bootstrap/alert';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './components/header/header.component';
import { PatientComponent } from './components/patient/patient.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DepartmentComponent } from './components/department/department.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    SidebarComponent,
    HeaderComponent,
    PatientComponent,
    CreatePatientComponent,
    SearchPatientComponent,
    EditPatientComponent,
    DashboardComponent,
    DoctorComponent,
    DepartmentComponent,
    AppointmentComponent,
    AddDoctorComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    AlertComponent,
    AlertModule,
    MatSidenavModule,
    MatToolbarModule,
    MatToolbarModule,
    MatListModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  providers: [provideNativeDateAdapter() , provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
