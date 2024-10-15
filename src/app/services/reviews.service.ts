import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReviewModel } from '../interfaces/reviewModel';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  
  constructor(private httpClient: HttpClient) { }
  url: string = "https://colombiareservabackend.vercel.app/reviews"

  createReview(data: {comment: string, stars: number, businessId: string}){
    return this.httpClient.post(this.url, data)
  }

  getAllReviews(){
    return this.httpClient.get<ReviewModel[]>(this.url)
  }

  getOneReview(id: string){
    return this.httpClient.get<ReviewModel>(`${this.url}/${id}`)
  }

  updateReview(id: string, data: ReviewModel){
    return this.httpClient.put(`${this.url}/${id}`, data)
  }

  deleteReview(id: string){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
