import { ScheduleModel } from "../interfaces/scheduleModel";

export function scheduleFormValidation(data: ScheduleModel, areBreaksActive: boolean): string {
  if(areBreaksActive){
    if(!data.breakStart || !data.breakFinish){
      return "Debe incluir las horas de inicio y fin del descanso."
    } else if(data.breakStart === data.breakFinish){
      return "Las horas de inicio y fin del descanso no pueden ser iguales."
    } else if(data.breakFinish < data.breakStart  ){
      return "La hora de fin del descanso no puede ser menor a la hora de inicio del descanso."
    } 
  }


  if(!data.openTime || !data.closeTime){
    return "Debe incluir hora de apertura y de cierre."
  } else if(data.openTime === data.closeTime){
    return "La hora de cierre y apertura no puede ser igual."
  } else if(data.closeTime < data.openTime  ){
    return "La hora de cierre no puede ser menor a la hora de apertura."
  } 


  else {
    return "OK"
  }
  
}

