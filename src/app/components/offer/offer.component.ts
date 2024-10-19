import { Component, inject } from '@angular/core';
import { OfferInterface, OfferService } from '../../services/offer.service';
import { OfferModel } from '../../interfaces/offerModel';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  offerService = inject(OfferService)
  activatedRoute = inject(ActivatedRoute)

  businessId: string | null = ""
  dataTobeSent: OfferInterface = {
    businessId: "",
    service: "",
    price: null,
    description: ""
  }

  allOffers: OfferModel[] = []
  showInputs = false
  errorMsg = ""
  offerId = ""
  userIsEditing = false

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');
      this.dataTobeSent.businessId = params.get('id');  
    });
    this.getAllOffers()
  }

  getAllOffers(){
    this.offerService.getAllOffers().subscribe((res: OfferModel[]) => {
      this.allOffers = res.filter(offer => offer.businessId === this.businessId)
    })
  }

  handleSubmit(){
    if(this.userIsEditing){
      this.handleEdition()
    } else {
      this.handleCreate()
    }
  }

  handleCreate(){
    if(this.dataTobeSent.service.length){
      this.offerService.createOffer(this.dataTobeSent).subscribe((res: any) => {
        this.showInputs = false
        this.getAllOffers()
        // reset inputs
        this.dataTobeSent = {businessId: this.businessId, service: "", price: null, description: ""}
        this.errorMsg = ""
      })
    } else {
      this.errorMsg = "Debe completar por lo menos el primer campo."
    }
  }

  handleEdition(){
    if(this.dataTobeSent.service.length){
      this.offerService.updateOffer(this.offerId, this.dataTobeSent).subscribe((res: any) => {
        this.showInputs = false
        this.userIsEditing = false
        this.getAllOffers()
        // reset inputs
        this.dataTobeSent = {businessId: this.businessId, service: "", price: null, description: ""}
        this.errorMsg = ""
      })
    } else {
      this.errorMsg = "Debe completar por lo menos el primer campo."
    }
  }

  deleteOne(id: string){
    this.offerService.deleteOffer(id).subscribe((res: any) => {
      this.getAllOffers()
    })
  }

  activateEdition(_id: string){
    this.offerId = _id
    this.userIsEditing = true
    this.showInputs = true;
    this.getOneOffer(_id)

  }

  getOneOffer(_id: string){
    this.offerService.getOneOffer(_id).subscribe((res: OfferModel) => {
      this.dataTobeSent.businessId = res.businessId
      this.dataTobeSent.service = res.service
      this.dataTobeSent.description = res.description
      this.dataTobeSent.price = res.price
    })
  }

  cancel(){
    // reset inputs
    this.dataTobeSent = {businessId: this.businessId, service: "", price: null, description: ""}
    this.showInputs = false
  }

}
