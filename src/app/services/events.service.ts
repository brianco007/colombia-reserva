import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventModel } from '../interfaces/eventModel';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private httpClient: HttpClient) { }
  url: string = "http://localhost:3000/events"

  createEvent(data: EventModel){
    return this.httpClient.post(this.url, data)
  }

  getAllEvents(){
    return this.httpClient.get<EventModel[]>(this.url)
  }

  getOneEvent(id: string){
    return this.httpClient.get<EventModel>(`${this.url}/${id}`)
  }

  updateEvent(id: string, data: EventModel){
    return this.httpClient.put(`${this.url}/${id}`, data)
  }

  deleteEvent(id: string){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
