import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './image-gallery.component.html',
  styleUrl: './image-gallery.component.css',
})
export class ImageGalleryComponent implements OnChanges {
  imageBaseUrl = `${environment.API_URL}images/`;
  carouselKey = 0;
  @Input() images: IImage[];
  @Output() deleteImgEvent = new EventEmitter<number>();
  @Input() canModify: boolean;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.cdr.detectChanges();
      this.carouselKey++;
    }
  }
  deleteImg(id: number) {
    this.deleteImgEvent.emit(id);
  }
  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
