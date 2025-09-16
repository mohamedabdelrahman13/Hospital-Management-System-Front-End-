import { invoiceDetailsDTO } from "../invoice/invoiceDetailsDTO";

export interface patientDetailsDTO {
    name: string;
    birthDate: string; // ISO string, you can use Date if you parse it
    gender: string;
    createdOn: string; // ISO string
    phone: string;
    invoices: invoiceDetailsDTO[];
}