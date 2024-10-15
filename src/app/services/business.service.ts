import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusinessModel } from '../interfaces/businessModel';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }
  url: string = "http://localhost:3000/businessInfo"

  createBusinessInfo(data: BusinessModel){
    return this.httpClient.post(this.url, data)
  }

  getBusinessInfo(){
    return this.httpClient.get<BusinessModel[]>(this.url)
  }

  getOneBusinessInfo(id: string){
    return this.httpClient.get<BusinessModel>(`${this.url}/${id}`)
  }

  updateBusinessInfo(id: string, data: FormData){
    return this.httpClient.put(`${this.url}/${id}`, data)
  }

  updateBusinessInfo2(id: string, data: BusinessModel){
    return this.httpClient.put(`${this.url}/${id}`, data)
  }

  deleteBusinessInfo(id: string){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
