import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
} from '@coreui/angular';
import { environment } from '@org/environment';
import { IImage } from '@org/models';

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
  isVisible = true;
  @Input() images: IImage[];
  @Output() deleteImgEvent = new EventEmitter<number>();
  @Output() uploadImgEvent = new EventEmitter<FileList>();
  @Input() canModify: boolean;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['images']) {
      this.isVisible = false;
      this.cdr.detectChanges();
      this.isVisible = true;
    }
  }
  deleteImg(id: number) {
    this.deleteImgEvent.emit(id);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = input.files;
      this.uploadImgEvent.emit(files);
    }
  }
}
