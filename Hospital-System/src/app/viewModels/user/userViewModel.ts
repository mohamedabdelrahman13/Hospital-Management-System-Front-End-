import { doctorProfile } from "../../models/doctorProfile/doctorProfile";
export interface UserViewModel {
    id:string,
    userName:string,
    phoneNumber:string,
    email:string,
    isDeleted:boolean,
    doctorProfile:doctorProfile
}