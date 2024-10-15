import { Component, inject } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { ReviewsService } from '../../services/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessModel } from '../../interfaces/businessModel';
import { ReviewModel } from '../../interfaces/reviewModel';
import formatDateTofromISO from '../../utils/formatDateFromISO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isItAnOwner } from '../../utils/isItAnOwner';
import { EventModel } from '../../interfaces/eventModel';
import { EventsService } from '../../services/events.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  businessService = inject(BusinessService)
  reviewsService = inject(ReviewsService)
  eventsService = inject(EventsService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  showReviewsForm: boolean = false;
  businessId: string | null= "";
  businessName = ""
  businessReviews: ReviewModel[] = [];
  reviewsFormData = {
    comment: "",
    stars: 5,
  }
  isItAnOwner = isItAnOwner(this.router)

  // check confirmation number
  confirmationNums: Number[] = []
  allEvents: EventModel[] = []
  inputValue = ""
  enableEdition = false
  customerName = ""
  errMessage = ""

  //loader
  loading: boolean = false

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessInfo()
    this.getBusinessReviews()
    this.getAllConfirmationNums()
  }

  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        this.businessName = res.businessName
      })
    } 
  }

  getAllConfirmationNums(){
    this.eventsService.getAllEvents().subscribe((res: EventModel[]) => {
      const thisBusinessEvents = res.filter(event => event.businessId === this.businessId)
      this.confirmationNums = thisBusinessEvents.map(event => event.confirmationNumber)
      this.allEvents = res
    })
  }

  getBusinessReviews() {
    if(this.businessId){
      this.loading = true
      this.reviewsService.getAllReviews().subscribe((allReviews: ReviewModel[]) => {
        const onlyThisBusinessReviews = allReviews.filter(review => review.businessId === this.businessId).map(review => {
          return {
            ... review,
            createdAt: formatDateTofromISO(review.createdAt)
          }
        })
        this.businessReviews = onlyThisBusinessReviews.reverse()
        this.loading = false
      })
    } 
  }

  handleReviewsSubmit(){
    if(this.businessId !== null){
      const data = {
        ...this.reviewsFormData,
        businessId: this.businessId
      }

      this.reviewsService.createReview(data).subscribe((res: any) => {
        this.showReviewsForm = false
        this.getBusinessReviews()
        this.reviewsFormData = {comment: "", stars: 5}
      })
    }
  }

  onBtnClose(){
    this.showReviewsForm = false
    this.inputValue = ""
    this.enableEdition = false
    this.errMessage = ""
  }

  handleOverStars(stars: number){
    if(stars > 5){
      this.reviewsFormData.stars = 5
    }
  }

  limitDigits() {
    
    const wasItFound = this.confirmationNums.filter(num => num === Number(this.inputValue))
    if(wasItFound.length){
      this.enableEdition = true
      const event = this.allEvents.filter(event => event.confirmationNumber === wasItFound[0])
      this.customerName = event[0].title.split(" ")[0].trim()
    } else {
      this.errMessage = "No se encuentra este número de reserva."
    }

    if (this.inputValue.length > 6) {
      this.inputValue = this.inputValue.slice(0, 6);
    }
  }
}
