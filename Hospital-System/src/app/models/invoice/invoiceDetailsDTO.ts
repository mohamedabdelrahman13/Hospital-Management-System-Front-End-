import { paymentDetailsDTO } from "../paymentDetailsDTO/paymentDetailsDTO";

export interface invoiceDetailsDTO {
    id: string;
    amount: number;
    doctorName: string | null;
    speciality: string;
    status: string;
    createdAt: string; // ISO string
    payments: paymentDetailsDTO[];
  }