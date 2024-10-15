import { Router } from "@angular/router"

export function isItAnOwner(router: Router){
  if(router.url.includes("dashboard")){
    return true
  } else {
    return false
  }
}
