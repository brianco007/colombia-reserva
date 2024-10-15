import { Component, inject } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { generateTimeSlots } from '../../utils/generateTimeSlots';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleModel } from '../../interfaces/scheduleModel';
import { BusinessModel } from '../../interfaces/businessModel';
import { scheduleFormValidation } from '../../utils/scheduleFormValidation';
import { ActivatedRoute, Router } from '@angular/router';
import { generalInfoFormValidation } from '../../utils/generalInfoFormValidation';
import openingHours from '../../utils/openingHours';

@Component({
  selector: 'app-editschedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editschedule.component.html',
  styleUrl: './editschedule.component.css'
})
export class EditscheduleComponent {
  businessService = inject(BusinessService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  businessId: string | null = ""
  activateEdition3: boolean = false
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
  businessInfo: BusinessModel = {
    schedule: [],
    sessionTime: "",
    timeSlots: [],
    businessName: "",
    address: "",
    phone: "", 
    email: "",
    aboutUs: "",
    banner: ""
  }
  showScheduleForm: boolean = false
  openingHoursArr: string[] = []
  showModal3: boolean = false;


  ngOnInit(){
    this.timeSlots = generateTimeSlots();
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessInfo()
  }

  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        this.businessInfo = res
        this.openingHoursArr =  openingHours(res.schedule)
        this.businessInfo.schedule = []
      })
    } 
  }

  handleNext(){   
    this.errorMsg = scheduleFormValidation(this.dayObject, this.areBreaksActive)
    if(this.errorMsg === "OK"){
      // save object in the schedule array
      this.dayObject.day = this.daysOfTheWeek[this.currentDayIndex]
      this.businessInfo.schedule.push(this.dayObject)
  
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
      if(!this.businessInfo.schedule.length){
        this.errorMsg = "No puede saltarse todos los días."
      } else {
        this.handleSubmit()
      }
    }
  }

  handleSubmit(){
    if(this.businessId){
      this.businessService.updateBusinessInfo2(this.businessId, this.businessInfo).subscribe((res: any) => {
        this.showModal3 = true;
      })
    }
  }

  toggleVisibility(){
    const message = generalInfoFormValidation(this.businessInfo)
    if(message !== "OK"){
      this.errorMsg = message
    } else {
      this.showScheduleForm = true
      this.errorMsg = ""
    }
  }

  toggleEdition3(){
    this.activateEdition3 = !this.activateEdition3
  }

  onModalClose(){
    window.location.reload()
  }
  
}
