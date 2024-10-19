import { Component, inject } from '@angular/core';
import { BusinessService } from '../../services/business.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessModel } from '../../interfaces/businessModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-session-time',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './session-time.component.html',
  styleUrl: './session-time.component.css'
})
export class SessionTimeComponent {
  businessService = inject(BusinessService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  
  businessId: string | null= ""; 
  dataToBeSent: BusinessModel = {
    schedule: [],
    sessionTime: "",
    banner: null,
    businessName: "",
    address: "",
    phone: "",
    email: "",
    aboutUs: ""
  }

  showModal: boolean = false;
  addShakingEffects: boolean = false
    
  
  onFileChange(event: any) {
    // Get the file from the input
    if (event.target.files && event.target.files.length > 0) {
      this.dataToBeSent.banner = event.target.files[0]
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessInfo()
  }
  
  getBusinessInfo() {
    if(this.businessId){
      this.businessService.getOneBusinessInfo(this.businessId).subscribe((res: BusinessModel) => {
        this.dataToBeSent = res
      })
    } 
  }

  handleSubmit() {
    const formData = new FormData();
      formData.append('sessionTime', JSON.stringify(this.dataToBeSent.sessionTime));
      formData.append('schedule', JSON.stringify(this.dataToBeSent.schedule));

    if (this.dataToBeSent.banner) {
      formData.append('banner', this.dataToBeSent.banner);
    }

    console.log(this.dataToBeSent.banner)
    
    if (this.businessId) {
      this.businessService.updateBusinessInfo(this.businessId, formData).subscribe((res: any) => {
        this.showModal = true
      });
    }
  }

  onFormClick(event: Event) {
    event.stopPropagation(); // Prevents click event from bubbling to the parent
  }

  onModalContainerClick(){
    this.addShakingEffects = true
    setInterval(()=>{
      this.addShakingEffects = false
    }, 1000)
  }

  onModalClose(){
    this.router.navigate(["/home"]);
  }

}
