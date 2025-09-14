import { doctorProfile } from "../../models/doctorProfile/doctorProfile";
import { consultationHoursViewModel } from "../consultationHours/consultationHoursViewModel";
export interface doctorViewModel {

    id:string,
    userName:string,
    phoneNumber:string,
    email:string,
    doctorProfile:doctorProfile
    // id:string,
    // name:string,
    // address:string,
    // speciality:string,
    // cost:number,
    // consultationHours:consultationHoursViewModel[];
}