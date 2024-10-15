import { ScheduleModel } from "./scheduleModel";

export interface BusinessModel {
  schedule: ScheduleModel[],
  sessionTime?: String, 
  timeSlots?: {day: string, timeSlots: {value:string, display: string}[]}[],
  banner?: File | string | null,
  businessName: string,
  address: string,
  phone: string,
  email: string,
  aboutUs: string,
  instagram?: string,
  facebook?: string,
  tiktok?: string,
  youtube?: string,
  linkedIn?: string,
}