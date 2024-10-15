
interface formData  {
  name: string,
  phone: string,
  email: string,
  date: string,
  time: string
}


export function eventFormValidation(data: formData): string {
  const now = new Date().getUTCDate()
  const dateSelected = new Date(data.date).getUTCDate()

  const phoneRegex = /^[3][0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  if(!data.name){
    return "Debe completar el campo del nombre."
  } else if(!phoneRegex.test(data.phone)){
    return "Ingrese un número de celular válido."
  } else if(!emailRegex.test(data.email)){
    return "Ingrese un correo válido."
  } else if(!data.date){
    return "Debe seleccionar una fecha de reserva."
  } else if(dateSelected < now){
    return "La fecha de reserva no puede ser anterior a la fecha actual."
  } else if(!data.time){
    return "Debe selccionar una hora para su reserva."
  } else {
    return "OK"
  }
  
}