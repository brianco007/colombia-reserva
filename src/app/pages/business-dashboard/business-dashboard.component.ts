import { Component, inject } from '@angular/core';
import { BusinessModel } from '../../interfaces/businessModel';
import { BusinessService } from '../../services/business.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FullcalendarComponent } from '../fullcalendar/fullcalendar.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { EditBusinessInfoComponent } from '../../components/edit-business-info/edit-business-info.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';


@Component({
  selector: 'app-business-dashboard',
  standalone: true,
  imports: [CommonModule, FullcalendarComponent, ReviewsComponent, EditBusinessInfoComponent, GalleryComponent, RouterLink],
  templateUrl: './business-dashboard.component.html',
  styleUrl: './business-dashboard.component.css'
})
export class BusinessDashboardComponent {

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  businessService = inject(BusinessService)

  businessId: string | null= "";
  backendURL: string = "http://localhost:3000/businessBanners/"

  activeLinkOnMenu: boolean[] = [true, false, false]

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

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessInfo()
  }

  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        this.businessInfo = res
      })
    } 
  }

  toggleActiveLink(position: number){
    const newArr = this.activeLinkOnMenu.map((link, index) => index !== position ? false : true)
    this.activeLinkOnMenu = newArr
  }


}
