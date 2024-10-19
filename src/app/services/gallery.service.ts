import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GalleryModel } from '../interfaces/galleryModel';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private httpClient: HttpClient) { }
  url: string = "https://colombiareservatodo.web.app/gallery/"

  createGallery(data: FormData){
    return this.httpClient.post(this.url, data)
  }

  getAllGalleries(){
    return this.httpClient.get<{pics: string[], businessId: string}[]>(this.url)
  }

  getOneGallery(id: string){
    return this.httpClient.get<GalleryModel>(`${this.url}/${id}`)
  }

  deleteGallery(id: string){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
