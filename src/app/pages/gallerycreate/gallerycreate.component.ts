import { Component, inject } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { GalleryModel } from '../../interfaces/galleryModel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallerycreate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallerycreate.component.html',
  styleUrl: './gallerycreate.component.css'
})
export class GallerycreateComponent {
  galleryService = inject(GalleryService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  businessId: string | null = ""
  dataToBeSent: GalleryModel = {
    pics: [],
    businessId: ""
  }
  selectedFiles: File[] = [];
  imageUrls: string[] = [];

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
  }


  // Select files and show preview
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.dataToBeSent.pics = Array.from(files);
    this.selectedFiles = Array.from(files);
    this.imageUrls = this.selectedFiles.map(file => URL.createObjectURL(file));
    console.log(this.selectedFiles); // Para verificar los archivos seleccionados
  }
  getImageUrl(file: File): string {
    return URL.createObjectURL(file);
  }
  ngOnDestroy(): void {
    this.imageUrls.forEach(url => URL.revokeObjectURL(url));
  }

  handleSubmit(event: Event) { 
    event.preventDefault();
    const formData = new FormData();

    // Append each file to the FormData
    this.dataToBeSent.pics.forEach((file) => {
      formData.append('banners', file); // 'banners[]' should match what your backend expects
    });
  
    // Append businessId
    if (this.businessId) {
      formData.append('businessId', this.businessId);
    }
  
    // Make the HTTP request (assuming you have a service to do this)
    this.galleryService.createGallery(formData).subscribe((response: any) => {
      this.router.navigate([`dashboard/${this.businessId}`])
    })
    }

}
