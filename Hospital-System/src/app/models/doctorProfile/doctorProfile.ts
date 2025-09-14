import { consultationHoursViewModel } from "../../viewModels/consultationHours/consultationHoursViewModel";

export interface doctorProfile{
    id:string,
    speciality:string,
    cost:number
    consultationHours:consultationHoursViewModel[],
}