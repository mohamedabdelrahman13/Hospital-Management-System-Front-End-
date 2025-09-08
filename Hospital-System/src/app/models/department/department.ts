import { doctor } from "../doctor/doctor";

export interface department {
    id:string,
    name:string,
    ar_Name:string,
    doctors:doctor[]
}