import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  createPaymentIntent(request: any) {
    return this.http.post<{ clientSecret: string }>(`${environment.apiUrl}/api/Payment/create-payment-intent`, request);
  }

}