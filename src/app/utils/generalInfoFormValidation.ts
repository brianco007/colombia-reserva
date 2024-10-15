import { BusinessModel } from "../interfaces/businessModel";


export function generalInfoFormValidation(data: BusinessModel): string {


  const phoneRegex = /^[3][0-9]{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if(data.businessName.length < 5){
    return "El nombre del negocio debe contener 5 letras como mínimo."
  } else if(data.address.length < 10){
    return "La dirección es demasiado corta."
  } else if(!phoneRegex.test(data.phone)){
    return "Ingrese un número de celular válido."
  } else if(!emailRegex.test(data.email)){
    return "Ingrese un correo válido."
  } else if(!data.aboutUs){
    return "Escriba una descripción de su negocio."
  } else {
    return "OK"
  }
  
}