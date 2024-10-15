import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventModel } from '../../interfaces/eventModel';

@Component({
  selector: 'app-cancel-appointment',
  standalone: true,
  imports: [],
  templateUrl: './cancel-appointment.component.html',
  styleUrl: './cancel-appointment.component.css'
})
export class CancelAppointmentComponent {
  activatedRoute = inject(ActivatedRoute)
  eventsService = inject(EventsService)
  router = inject(Router)

  eventId: string | null = ""
  eventInfo: EventModel = {
    businessId: "",
    title: "",
    email: "",
    start: "",
    end: "", 
    confirmationNumber: 0
  }

  showConfirmationModal: boolean = false;

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.eventId = params.get('id')
    })
    this.getEventInfo()
  }

  getEventInfo(){
    if(this.eventId){
      this.eventsService.getOneEvent(this.eventId).subscribe((res: EventModel) => {
        this.eventInfo = res
      })
    }
  }

  deleteEvent(){
    if(this.eventId){
      this.eventsService.deleteEvent(this.eventId).subscribe((res: any) => {
        this.showConfirmationModal = true
      })
    }

  }

  close(){
    window.close()
  }

  navigateToBooking() {
    this.router.navigate([`/booking/${this.eventInfo.businessId}`]);
  }

  
}
