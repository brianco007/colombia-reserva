import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryService } from '../../services/gallery.service';
import { ActivatedRoute } from '@angular/router';
import { GalleryModel } from '../../interfaces/galleryModel';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  galleryService = inject(GalleryService)
  activatedRoute = inject(ActivatedRoute)

  pictures: string[] = []

  businessId: string | null = ""
  currentIndex = 0
  currentPicture = this.pictures[this.currentIndex]

  //loader
  loading: boolean = false


  handleDotClick(index: number){
    this.currentIndex = index
    this.currentPicture = this.pictures[this.currentIndex]
  }

 
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      this.businessId = params.get('id');  
    });
    this.getBusinessBanners()
    // Start the automatic change
    this.changeAutomatically();
  }
  
  changeAutomatically(){
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.pictures.length;
      this.currentPicture = this.pictures[this.currentIndex];
    }, 5000);
  }

  getBusinessBanners(){
    if(this.businessId){
      this.loading = true
      this.galleryService.getAllGalleries().subscribe((res: {pics: string[], businessId: string}[]) => {
        const thisBusinessPics = res.filter(gallery => gallery.businessId === this.businessId)

        // if business has at least one pic
        if(thisBusinessPics.length){
          this.pictures = res.filter(gallery => gallery.businessId === this.businessId)[0].pics
          // Set initial picture
          this.currentIndex = 0;
          this.currentPicture = this.pictures[this.currentIndex];
          this.loading = false

          
        } else {
          this.pictures = ["https://rtvc-assets-radionacional-v2.s3.amazonaws.com/s3fs-public/senalradio/articulo-noticia/galeriaimagen/pasto_6.jpg", "https://pbs.twimg.com/media/FWBzD7QWIAY9r4Q.jpg:large"]

          // Set initial picture
          this.currentIndex = 0;
          this.currentPicture = this.pictures[this.currentIndex];
          this.loading = false

        }
      })
    }
  }
}
