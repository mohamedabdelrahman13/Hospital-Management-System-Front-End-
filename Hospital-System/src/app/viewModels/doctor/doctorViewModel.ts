import { consultationHoursViewModel } from "../consultationHours/consultationHoursViewModel";
export interface doctorViewModel {
    id:string,
    name:string,
    address:string,
    speciality:string,
    cost:number,
    consultationHours:consultationHoursViewModel[];
}