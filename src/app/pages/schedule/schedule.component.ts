import { Component, inject } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { generateTimeSlots } from '../../utils/generateTimeSlots';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleModel } from '../../interfaces/scheduleModel';
import { BusinessModel } from '../../interfaces/businessModel';
import { scheduleFormValidation } from '../../utils/scheduleFormValidation';
import { Router } from '@angular/router';
import { generalInfoFormValidation } from '../../utils/generalInfoFormValidation';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  businessService = inject(BusinessService)
  router = inject(Router)

  timeSlots: { display: string, value: string }[] = [];
  areBreaksActive: boolean = false
  daysOfTheWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
  currentDayIndex: number = 0
  currentDay: string = this.daysOfTheWeek[this.currentDayIndex]
  errorMsg: string = ""
  dayObject: ScheduleModel = {
    day: "",
    openTime: "",
    closeTime: "",
    breakStart: "",
    breakFinish: ""
  }
  dataTobeSent: BusinessModel = {
    schedule: [],
    businessName: "",
    address: "",
    phone: "", 
    email: "",
    aboutUs: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    linkedIn: "",
  }
  showScheduleForm: boolean = false

  ngOnInit(){
    this.timeSlots = generateTimeSlots();
  }

  handleNext(){   
    this.errorMsg = scheduleFormValidation(this.dayObject, this.areBreaksActive)
    if(this.errorMsg === "OK"){
      // save object in the schedule array
      this.dayObject.day = this.daysOfTheWeek[this.currentDayIndex]
      this.dataTobeSent.schedule.push(this.dayObject)
  
      // reset values
      this.dayObject = {
        day: "",
        openTime: "",
        closeTime: "",
        breakStart: "",
        breakFinish: ""
      }
      this.areBreaksActive = false

      //show next day title
      if(this.currentDayIndex < 6){
        this.currentDayIndex++
        this.currentDay = this.daysOfTheWeek[this.currentDayIndex]
      } else {
        this.handleSubmit()
      }

    }
    
  }

  handleSkip(){   
    if(this.currentDayIndex < 6){
      this.currentDayIndex++
      this.currentDay = this.daysOfTheWeek[this.currentDayIndex]
      this.errorMsg === ""
    } else {
      if(!this.dataTobeSent.schedule.length){
        this.errorMsg = "No puede saltarse todos los días."
      } else {
        this.handleSubmit()
      }
    }
  }

  handleSubmit(){
    this.businessService.createBusinessInfo(this.dataTobeSent).subscribe((res: any) => {
      this.router.navigate([`/sessionTime/${res.createdBusiness._id}`])
    })
  }

  toggleVisibility(){
    const message = generalInfoFormValidation(this.dataTobeSent)
    if(message !== "OK"){
      this.errorMsg = message
    } else {
      this.showScheduleForm = true
      this.errorMsg = ""
    }
  }
  
}
