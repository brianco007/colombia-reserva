import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferModel } from '../interfaces/offerModel';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  httpClient = inject(HttpClient)
  url: string = "https://colombiareservabackend.vercel.app/offer"

  createOffer(data: OfferInterface){
    return this.httpClient.post(this.url, data)
  }

  getAllOffers(){
    return this.httpClient.get<OfferModel[]>(this.url)
  }

  getOneOffer(id: string){
    return this.httpClient.get<OfferModel>(`${this.url}/${id}`)
  }

  updateOffer(id: string, data: OfferInterface){
    return this.httpClient.put(`${this.url}/${id}`, data)
  }

  deleteOffer(id: string){
    return this.httpClient.delete(`${this.url}/${id}`)
  }

}

export interface OfferInterface {
  businessId: string | null,
  service: string,
  description?: string,
  price?: number | null
}