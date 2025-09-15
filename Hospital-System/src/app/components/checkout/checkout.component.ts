import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../services/doctorService/doctor.service';
import { PatientService } from '../../services/PatientService/patient.service';
import { InvoiceService } from '../../services/invoiceService/invoice.service';
import { invoice } from '../../models/invoice/invoice';
import { response } from '../../models/response/response';
import { invoiceResponse } from '../../models/InvoiceResponse/InvoiceResponse';
import { paymentRequestDTO } from '../../models/paymentRequestDTO/paymentRequestDTO';
import { ToastrService } from 'ngx-toastr';
import { appointmentViewModel } from '../../viewModels/Appointment/appointmentViewModel';
import { AppointmentService } from '../../services/appointmentService/appointment.service';
import { appointmentBookingDTO } from '../../models/AppointmentBookingDTO/appointmentBookingDTO';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  invoiceResponse!:invoiceResponse;
  patientName!: string;
  doctorName!: string;
  patientId!: string;
  doctorId!: string;
  cost!: number;
  speciality!: string;
  date!: string;
  startTime!: string;
  endTime!: string;
  invoiceData!:invoice;

  AppointmentData!:appointmentBookingDTO

  constructor(private route: ActivatedRoute , 
    private doctorService:DoctorService
    ,private patientService:PatientService
    ,private invoiceService:InvoiceService
    ,private router:Router
    ,private toastr:ToastrService
    ,private appointmentService:AppointmentService) {}




  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      this.doctorId = params['doctorId'];
      this.cost = +params['cost'];
      this.speciality = params['speciality'];
      this.date = params['date'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      
    });

   

      // ✅ fetch patient name
      this.patientService.getPatientByID(this.patientId).subscribe(patient => {
        this.patientName = patient.name;
      });

      // ✅ fetch doctor name
      this.doctorService.getDoctorByUserId(this.doctorId).subscribe(doc => {
        this.doctorName = doc.userName;
      });


      this.invoiceData = {
        doctorId:this.doctorId,
        patientId : this.patientId ,
        speciality: this.speciality,
        amount : this.cost,
        paymentMethod:''
      }

      this.AppointmentData = {
        patientId : this.patientId,
        doctorId : this.doctorId,
        date : this.date,
        speciality : this.speciality,
        startTime : this.startTime,
        endTime : this.endTime,
        cost:this.cost,
      }
  }


  proceed(method : 'card' | 'cash') {
    this.invoiceData.paymentMethod = method
      this.invoiceService.createInvoice(this.invoiceData)
        .subscribe(invoice => {
          if (method === 'cash') {
          const paymentRequest:paymentRequestDTO = {
              amount : invoice.amount,
              stripePaymentId:'',
              status:'cash'
          }

          // () => {
          //   this.toastr.success('Appointment is booked successfully!')
          // }
          // directly mark as paid
          this.invoiceService.markAsPaid(invoice.id , paymentRequest).subscribe({
            next:() => this.appointmentService.bookAppointment(this.AppointmentData).subscribe({
              next:(res) => {
                this.toastr.success('appointment booked');
                this.router.navigate(['/hospital-system/patient']);
                },
                error:(err) => {console.log(err)}
              })
            });
          } else if(method === 'card'){
            // redirect to card details page
            this.router.navigate(['/hospital-system/card-payment'] , {
              queryParams:{
                patientId : invoice.patientId,
                invoiceId : invoice.id,
                amount : invoice.amount,
                doctorId : this.doctorId,
                date : this.date,
                startTime:this.startTime,
                endTime : this.endTime,
                speciality: this.speciality,
              }
            });
          }
        });
    
  }

}
