import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/PatientService/patient.service';
import { patient } from '../../models/patient-model/patient';
import { doctor } from '../../models/doctor/doctor';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { UserViewModel } from '../../viewModels/user/userViewModel';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { response } from '../../models/response/response';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  private response!: any
  public doctor!: UserViewModel;
  public doctorName!: string;
  public patientName!: string;
  public appCost!:number;
  public speciality!: string;
 colors : string[] = ['red' , 'green' , 'blue' , 'yellow']
  public appointmentForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService
    , private fb: FormBuilder
    , private appoinService: AppointmentService
    , private toastr: ToastrService
    ,private router:Router
    ,private datePipe:DatePipe) {

  }
  ngOnInit(): void {

    const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    const doctorId = this.activatedRoute.snapshot.paramMap.get('doctorId');
    this.appointmentForm = this.fb.group({
      patientId: [patientId],
      doctorId: [doctorId],
      cost: [''],
      speciality: [''],
      date: [''],
      startTime: [new Date()],
      endTime: [{ value: null, disabled: true }]
    })


    //make the EndDate automatically set to start time + 30 mins
    this.appointmentForm.get('startTime')?.valueChanges.subscribe((start: Date) => {
      if (start) {
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        this.appointmentForm.get('endTime')?.setValue(end, { emitEvent: false });
      }
    });

    if (patientId) {
      this.patientService.getPatientByID(patientId).subscribe(pat => {
        this.patientName = pat.name;
      });
    }
    
    if (doctorId) {
      this.doctorService.getDoctorByUserId(doctorId).subscribe(doc => {
        this.doctor = doc;
        this.appointmentForm.patchValue({
          cost:this.doctor.doctorProfile.cost
        })
        this.appCost = doc.doctorProfile.cost
        this.doctorName = doc.userName;
        this.speciality = doc.doctorProfile.speciality;
        this.appointmentForm.patchValue({

          speciality: doc.doctorProfile.speciality
        });
      });
    }




  }


  formatTime(date: Date): string | null{
    return this.datePipe.transform(date , 'HH:mm:00');
  }

  Checkout(){
    const appValue = this.appointmentForm.getRawValue(); //includes the disabled values.. (endTime..)
    const payload = {
      ...appValue,
      startTime: this.formatTime(appValue.startTime),
      endTime: this.formatTime(appValue.endTime),
    }

    // check whether the appointment is within the doctor consultation time or not 
    this.appoinService.checkAvailability(payload).subscribe(res => {
      this.response = res;
      if (this.response.statusCode == 200) { 
        //redirect to checkout with queryParameters ...
        this.router.navigate(['/hospital-system/checkout'], {
          queryParams: {
            patientId: payload.patientId,
            doctorId: payload.doctorId,
            cost: payload.cost,
            speciality: payload.speciality,
            date: payload.date,
            startTime: payload.startTime,
            endTime: payload.endTime
          }
        });
      }
      else if (this.response.statusCode == 409) { 
        this.toastr.warning(this.response.message) 
      }
      else { this.toastr.error(this.response.message) }
    })
 
  }
}
