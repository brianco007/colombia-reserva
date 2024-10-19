import { Component, inject, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/business.service';
import { BusinessModel } from '../../interfaces/businessModel';
import { CommonModule } from '@angular/common';
import { generalInfoFormValidation } from '../../utils/generalInfoFormValidation';
import { EditscheduleComponent } from '../editschedule/editschedule.component';
import { OfferComponent } from '../offer/offer.component';

@Component({
  selector: 'app-edit-business-info',
  standalone: true,
  imports: [FormsModule, CommonModule, EditscheduleComponent, OfferComponent],
  templateUrl: './edit-business-info.component.html',
  styleUrl: './edit-business-info.component.css'
})
export class EditBusinessInfoComponent {
  // Step 1: Create an event emitter
  @Output() infoHasBeenUpdated = new EventEmitter<void>();

  businessService = inject(BusinessService)
  activatedRoute = inject(ActivatedRoute)
  router = inject (Router)

  backendURL = "https://colombiareservatodo.web.app/businessBanners/"
  businessId: string | null= "";
  activateEditionGeneralInfo: boolean = false;
  activateEditionPicture: boolean = false;
  errorMsg: string = ""
  imagePreview: string | ArrayBuffer | null = null;
  businessInfo: BusinessModel = {
    schedule: [],
    sessionTime: "",
    timeSlots: [],
    businessName: "",
    address: "",
    phone: "", 
    email: "",
    aboutUs: "",
    banner: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    linkedIn:""
  }
  showModal: boolean = false
  showModal2: boolean = false

  
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
  
  updateGeneralBusinessInfo(){
    if(this.businessId){
      this.businessService.updateBusinessInfo2(this.businessId, this.businessInfo).subscribe((res: any) => {
        console.log(res)
        this.infoHasBeenUpdated.emit()
      })
    }
  }

  updatePicture(){
    const formData = new FormData();
    formData.append('sessionTime', JSON.stringify(this.businessInfo.sessionTime));
    formData.append('schedule', JSON.stringify(this.businessInfo.schedule));
    
    if (this.businessInfo.banner) {
      formData.append('banner', this.businessInfo.banner);
    }

    
    if(this.businessId){
      this.businessService.updateBusinessInfo(this.businessId, formData).subscribe((res: any) => {
        console.log(res)
      })
    }
    
  }

  
  handleInfoSubmit(){
    const message = generalInfoFormValidation(this.businessInfo)
    if(message !== "OK"){
      this.errorMsg = message
    } else {
      this.errorMsg = ""
      if(this.activateEditionPicture){
        this.updatePicture()
        this.showModal2 = true
      } else {
        this.updateGeneralBusinessInfo()
        this.showModal = true
      }
      this.activateEditionGeneralInfo = false
      this.infoHasBeenUpdated.emit()
    }
  }

  toggleEdition(){
    this.activateEditionGeneralInfo = !this.activateEditionGeneralInfo
    this.getBusinessInfo()
    this.errorMsg = ""
  }

  toggleEdition2(){
    this.activateEditionPicture = !this.activateEditionPicture
    this.getBusinessInfo()
    this.errorMsg = ""
  }

  // SELECT PICTURE AND SHOW PREVIEW
  onFileChange(event: any) {
    // Get the file from the input
    if (event.target.files && event.target.files.length > 0) {
      this.businessInfo.banner = event.target.files[0]
      const file = event.target.files[0]

      // Only proceed if the selected file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        
        reader.readAsDataURL(file);  // Convert the file to a data URL for the preview
      } else {
        this.errorMsg = "El archivo seleccionado no es una imagen.";
      }
    }
  }

  
  onModalClose(){
    this.showModal = false;
    window.location.reload();
  }

  onModalClose2(){
    this.showModal2 = false;
    window.location.reload();
  }
}
