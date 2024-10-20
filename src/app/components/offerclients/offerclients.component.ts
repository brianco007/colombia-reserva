import { Component, inject } from '@angular/core';
import { OfferService } from '../../services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { OfferModel } from '../../interfaces/offerModel';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-offerclients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offerclients.component.html',
  styleUrl: './offerclients.component.css'
})
export class OfferclientsComponent {
  offerService = inject(OfferService)
  activatedRoute = inject(ActivatedRoute)

  businessId: string | null = ""
  allOffers: OfferModel[] = []

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');
    });
    this.getThisBusinessOffers()
  }

  getThisBusinessOffers(){
    if(this.businessId){
      this.offerService.getAllOffers().subscribe((res: OfferModel[]) => {
        this.allOffers = res.filter(offer => offer.businessId === this.businessId)
      })
    }
  }

}
