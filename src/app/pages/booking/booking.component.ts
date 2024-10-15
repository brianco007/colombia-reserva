import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusinessModel } from '../../interfaces/businessModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventModel } from '../../interfaces/eventModel';
import addMinutes from '../../utils/addMinutes';
import { eventFormValidation } from '../../utils/eventFormValidation';

// services
import { BusinessService } from '../../services/business.service';
import { EventsService } from '../../services/events.service';
import openingHours from '../../utils/openingHours';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { WhatsappbtnComponent } from '../../components/whatsappbtn/whatsappbtn.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, ReviewsComponent, GalleryComponent, WhatsappbtnComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  activatedRoute = inject(ActivatedRoute)
  businessService = inject(BusinessService)
  eventsService = inject(EventsService)

  businessId: string | null= "";
  backendURL: string = "https://colombiareservabackend.vercel.app/businessBanners/"

  // Event creation
  dataToBeSent: BusinessModel = {
    schedule: [],
    sessionTime: "",
    timeSlots: [],
    businessName: "",
    banner: "",
    address: "",
    phone: "", 
    email: "",
    aboutUs: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    linkedIn: ""
  }

  formData = {
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    confirmationNumber: 0
  }
  clientEmail: string = ""
  selectedDaySlots: {value:string, display: string}[] = []
  errorMsg: string = ""
  allEvents: EventModel[] = []
  activeLinkOnMenu: boolean[] = [true, false, false]
  confirmationModal: boolean = false;

  // for reviews
  
  addShakingEffects = false

  // for details
  openingHoursArr: string[] = []
  showNotFoundModal: boolean = false

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessInfo()
    this.getAllEvents()
  }
  
  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        if(res === null){this.showNotFoundModal = true}
        this.dataToBeSent = res
        this.openingHoursArr =  openingHours(res.schedule)
      })
    } 
  }

 

  handleChange(){
    // Get day of the week selected
    const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
    const date = this.formData.date
    const dayIndex = new Date(date).getDay()
    const day = days[dayIndex]

    if(this.dataToBeSent.timeSlots){
      // filter slots by day selected
      let arrayOfSlots = this.dataToBeSent.timeSlots.filter(object => object.day === day)

      // add the date: value: "08:30:00" - value: "2024-09-07T08:30:00"
      arrayOfSlots = arrayOfSlots.map(daySlot => ({
        ...daySlot,
        timeSlots: daySlot.timeSlots.map(slot => ({
          ...slot,
          value: this.formData.date + "T" + slot.value 
        }))
      }));


      if(arrayOfSlots.length){
        // filter slots by date and time
        if(this.allEvents.length){
          const filteredSlots = arrayOfSlots[0].timeSlots.filter(slot => !this.allEvents.some(event => event.start === slot.value))
          this.selectedDaySlots = filteredSlots
        } else {
          this.selectedDaySlots = arrayOfSlots[0].timeSlots
        }
        
        this.errorMsg = ""
      } else {
        this.selectedDaySlots = []
        this.errorMsg = `El dia ${day} no hay atención.`
      }
    }
  }

  handleSubmmit(){
    const validationMessage = eventFormValidation(this.formData)
    if(validationMessage !== "OK"){
      this.errorMsg = validationMessage
    } else {
      if(this.businessId){
        const newEvent: EventModel = {
          businessId: this.businessId,
          email: this.formData.email,
          title: `${this.formData.name} - ${this.formData.phone}`,
          start: this.formData.time,
          end: addMinutes(this.formData.time, Number(this.dataToBeSent.sessionTime)),
          confirmationNumber: this.formData.confirmationNumber
        }
        
        this.eventsService.createEvent(newEvent).subscribe((res: any) => {
          this.confirmationModal = true
          this.clientEmail = this.formData.email
          this.formData = {name: "",phone: "", email:"", date:"", time:"", confirmationNumber: 0}
          this.getAllEvents()
        })
      } 
    }

  }

  getAllEvents(){
    this.eventsService.getAllEvents().subscribe((res: EventModel[]) => {
      this.allEvents = res
    })
  }

  toggleActiveLink(position: number){
    const newArr = this.activeLinkOnMenu.map((link, index) => index !== position ? false : true)
    this.activeLinkOnMenu = newArr
  }


  onFormClick(event: Event) {
    event.stopPropagation(); // Prevents click event from bubbling to the parent
  }

  onModalContainerClick(){
    this.addShakingEffects = true
    setInterval(()=>{
      this.addShakingEffects = false
    }, 1000)
  }

  openSocialMedia(event: MouseEvent, account: string) {
    event.preventDefault();
    if(account === this.dataToBeSent.instagram?.slice(1)){
      window.open(`https://www.instagram.com/${account}` , '_blank', 'noopener noreferrer');
    } else if(account === this.dataToBeSent.facebook?.slice(1)) {
      window.open(`https://www.facebook.com/${account}` , '_blank', 'noopener noreferrer');
    } else if(account === this.dataToBeSent.linkedIn?.slice(1)) {
      window.open(`https://www.linkedin.com/in/${account}` , '_blank', 'noopener noreferrer');
    } else if(account === this.dataToBeSent.tiktok) {
      window.open(`https://www.tiktok.com/${account}` , '_blank', 'noopener noreferrer');
    } else if(account === this.dataToBeSent.youtube) {
      window.open(`https://www.youtube.com/${account}` , '_blank', 'noopener noreferrer');
    }
  }


}
