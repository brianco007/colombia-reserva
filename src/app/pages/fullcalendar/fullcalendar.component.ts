import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; 
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { EventsService } from '../../services/events.service';
import { BusinessService } from '../../services/business.service';
import { EventModel } from '../../interfaces/eventModel';
import { ActivatedRoute } from '@angular/router';
import { BusinessModel } from '../../interfaces/businessModel';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, LoaderComponent],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.css'
})
export class FullcalendarComponent {
  // injections
  eventsService = inject(EventsService)
  businessService = inject(BusinessService)

  activatedRoute = inject(ActivatedRoute)

  // other variables
  businessId: string | null= "";
  businessName = ""
  openEventDetailsModal: boolean = false;
  eventTitle = ""
  eventId = ""
  customerEmail = ""
  customerWhatsapp = ""
  customerName = ""
  loading: boolean = false;
  

  // Fullcalendar setings
  calendarOptions: CalendarOptions = {
    plugins: [listPlugin],
    initialView: 'listWeek',
    locale: esLocale,
    footerToolbar: {
      start: 'today',
      end: 'listDay,listWeek'
    },
    headerToolbar: {
      end: 'prev,next'
    },
    buttonText: {
      listWeek:      'Semana',
      listDay:     'Día'
    },
    titleFormat: { year: 'numeric', month: 'short', day: '2-digit' },
    eventClick: (info) => {
      this.openEventDetailsModal = true;
      this.eventTitle = info.event.title
      this.eventId = info.event.extendedProps['_id']
      this.customerEmail = info.event.extendedProps['email']
      this.customerWhatsapp = info.event.title.split('-')[1].trim()
      this.customerName = info.event.title.split('-')[0].trim().split(" ")[0]
    }
  };

  

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getAllEvents()
    this.getBusinessInfo()
  }

  getAllEvents(){
    this.loading = true
    this.eventsService.getAllEvents().subscribe((res: EventModel[]) => {
      this.calendarOptions.events = res.filter(event => event.businessId === this.businessId)
      this.loading = false
    })
  }

  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        this.businessName = res.businessName
      })
    } 
  }

  deleteEvent(eventId: string){
    this.eventsService.deleteEvent(eventId).subscribe((res) => {
      this.getAllEvents()
      this.openEventDetailsModal = false
    })
  }
}
