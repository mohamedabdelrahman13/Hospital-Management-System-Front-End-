import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from '../../models/response/response';
import { invoice } from '../../models/invoice/invoice';
import { environment } from '../../environments/environment';
import { paymentRequestDTO } from '../../models/paymentRequestDTO/paymentRequestDTO';
import { invoiceResponse } from '../../models/InvoiceResponse/InvoiceResponse';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http:HttpClient) { }

  createInvoice(invoice:invoice){
    return this.http.post<invoiceResponse>(`${environment.apiUrl}/api/Invoice/CreateInvoice` , invoice);
  }
  markAsPaid(InvoiceId:string  , paymentRequest:paymentRequestDTO){
    return this.http.post<invoiceResponse>(`${environment.apiUrl}/api/Invoice/MarkPaid/${InvoiceId}` , paymentRequest);
  }
}
