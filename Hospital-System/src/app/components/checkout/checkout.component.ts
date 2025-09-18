import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  
  @ViewChild('invoice') invoiceElement!:ElementRef;

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

   

      // fetch patient name
      this.patientService.getPatientByID(this.patientId).subscribe(patient => {
        this.patientName = patient.name;
      });

      // fetch doctor name
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

          // directly mark as paid if the payment is cash
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

  printInvoice(){
    const invoice = this.invoiceElement.nativeElement;

    html2canvas(invoice, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF('p', 'mm', 'a4');
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [80, 150]   // width = 80mm, height = 150mm
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // Calculate width/height to fit A4
      const imgProps = (pdf as any).getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_#${this.patientName}.pdf`);
    });
  }

}
