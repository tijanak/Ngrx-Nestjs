import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IImage } from '@org/models';
import {
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
} from '@coreui/angular';
import { RouterModule } from '@angular/router';
import { environment } from '@org/environment';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [
    RouterModule,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselInnerComponent,
    CarouselModule,
    CommonModule,
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css',
})
export class ImageGalleryComponent implements OnChanges {
  imageBaseUrl = `${environment.API_URL}images/`;
  @Input() images: IImage[];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change ', this.images);
  }
}
