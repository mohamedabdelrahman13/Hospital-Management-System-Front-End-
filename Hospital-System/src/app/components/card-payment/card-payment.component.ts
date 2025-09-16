import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/paymentService/payment.service';
import { ToastrService } from 'ngx-toastr';
import { loadStripe, Stripe, StripeCardElement, StripePaymentElement } from '@stripe/stripe-js';
import { InvoiceService } from '../../services/invoiceService/invoice.service';
import { environment } from '../../environments/environment';
import { appointmentBookingDTO } from '../../models/AppointmentBookingDTO/appointmentBookingDTO';
import { AppointmentService } from '../../services/appointmentService/appointment.service';

@Component({
  selector: 'app-card-payment',
  standalone: false,
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.css'
})
export class CardPaymentComponent implements OnInit {

  private invoiceId!: string;
  public patientId!: string;
  public amount!: number;


  public speciality!:string;
  public startTime!:string;
  public endTime!:string;
  public date!:string;
  public doctorId!:string;

  appointmentData!:appointmentBookingDTO;

  stripe!: Stripe | null;
  paymentElement!: StripePaymentElement;
  elements: any;


  constructor(private route: ActivatedRoute
    , private paymentService: PaymentService
    , private toastr: ToastrService
    , private invoiceService: InvoiceService
    , private router: Router
    ,private appointmentService:AppointmentService) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.patientId = params['patientId'];
      this.invoiceId = params['invoiceId'];
      this.speciality = params['speciality'];
      this.doctorId = params['doctorId'];
      this.startTime = params['startTime'];
      this.endTime = params['endTime'];
      this.date = params['date'];
      this.amount = +params['amount'];
    });

    //initialize appointement data to save
    this.appointmentData = {
      patientId : this.patientId,
      doctorId : this.doctorId,
      date : this.date,
      speciality : this.speciality,
      startTime : this.startTime,
      endTime : this.endTime,
      cost:this.amount,
    }

    this.loadStripe();

  }

  private async loadStripe() {
    this.stripe = await loadStripe(`${environment.stripePublishableKey}`); // Stripe publishable key



    if (this.stripe) {
      this.paymentService.createPaymentIntent({
        invoiceId: this.invoiceId,
        patientId: this.patientId,
        amount: this.amount
      }).subscribe(async res => {
        //initialize the elements in the template 
        this.elements = this.stripe!.elements({ clientSecret: res.clientSecret });
        this.paymentElement = this.elements.create('payment');
        this.paymentElement.mount('#payment-element');
      });
    }
  }

  async pay() {
    if (!this.invoiceId) {
      this.toastr.error('Invoice must be created before payment.')
      return;
    }

    this.paymentService.createPaymentIntent({
      invoiceId: this.invoiceId,
      patientId: this.patientId,
      amount: this.amount
    }).subscribe(async res => {


      if (this.stripe) {
        const { error, paymentIntent } = await this.stripe!.confirmPayment({
          elements: this.elements,
          confirmParams: {
            return_url: window.location.origin + '/payment-success',
          },
          redirect: 'if_required' // avoids full-page redirect
        });


        if (error) {
          console.error(error.message);
          this.toastr.error('Payment failed, please try again');
          return;
        }
        else if (paymentIntent && paymentIntent.status === 'succeeded') {
          this.invoiceService.markAsPaid(this.invoiceId, {
            amount: this.amount,
            status: 'succeeded',
            stripePaymentId: paymentIntent.id
          }).subscribe(() => {
            this.appointmentService.bookAppointment(this.appointmentData).subscribe(()=>{
            this.toastr.success('Appointment booked successfully!')
            this.router.navigate(['/hospital-system/patient']);
            })
          });
        }
      }
    });
  }



}
