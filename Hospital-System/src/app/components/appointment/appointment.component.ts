import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/PatientService/patient.service';
import { patient } from '../../models/patient-model/patient';
import { doctor } from '../../models/doctor/doctor';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { doctorViewModel } from '../../viewModels/doctor/doctorViewModel';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { response } from '../../models/response/response';
interface IOptions {
  hstep: number[];
  mstep: number[];
  sstep: number[];
}
@Component({
  selector: 'app-appointment',
  standalone: false,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  response!: any
  doctor!: doctorViewModel;
  doctorName!: string;
  patientName!: string;
  speciality!: string;
  // hstep = 1;
  // mstep = 30;
  // sstep = 0;

  // mytime: Date = new Date();

  // options: IOptions = {
  //   hstep: [1, 2, 3],
  //   mstep: [1, 5, 10, 15, 25, 30],
  //   sstep: [0]
  // };
  public appointmentForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService
    , private fb: FormBuilder
    , private appoinService: AppointmentService
    , private toastr: ToastrService) {

  }
  ngOnInit(): void {

    const patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    const doctorId = this.activatedRoute.snapshot.paramMap.get('doctorId');
    this.appointmentForm = this.fb.group({
      patientId: [patientId],
      doctorId: [doctorId],
      speciality: [''],
      date: [''],
      startTime: [new Date()],
      endTime: [{ value: null, disabled: true }]
    })


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
      this.doctorService.getDoctorById(doctorId).subscribe(doc => {
        this.doctor = doc;
        console.log(doc)
        this.doctorName = doc.name;
        this.speciality = doc.speciality;
        this.appointmentForm.patchValue({
          speciality: doc.speciality
        });
      });
    }




  }


  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  }


  OnSubmit() {
    const appValue = this.appointmentForm.getRawValue(); //includes the disabled values..
    const payload = {
      ...appValue,
      startTime: this.formatTime(appValue.startTime),
      endTime: this.formatTime(appValue.endTime),
    }
    console.log(payload);
    this.appoinService.bookAppointment(payload).subscribe({
      next: (res) => {
        this.response = res;
        if (this.response.statusCode == 200) { this.toastr.success(this.response.message, 'Done') }
        else if (this.response.statusCode == 409) { this.toastr.warning(this.response.message) }
        else { this.toastr.error(this.response.message) }
        console.log(res);
      },
      error: (err) => {this.toastr.error('Server Error')}
    })
  }
}
