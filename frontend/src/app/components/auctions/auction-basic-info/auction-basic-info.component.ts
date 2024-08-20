import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { IAuction, IImage } from '@org/models';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';

@Component({
  selector: 'app-auction-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    ImageGalleryComponent,
    MatButtonModule,
  ],
  templateUrl: './auction-basic-info.component.html',
  styleUrl: './auction-basic-info.component.css',
})
export class AuctionBasicInfoComponent {
  @Input() auction!: IAuction;
  @Input() userCanModify: boolean;
  @Input() images: IImage[];
  @Output() deleteClicked = new EventEmitter();
  @Output() openClicked = new EventEmitter();
  @Output() updateClicked = new EventEmitter();
  @Input() isInList: boolean = false;
  @Output() deleteImgEvent = new EventEmitter<number>();
  @Output() uploadImgEvent = new EventEmitter<FileList>();
  deleteAuction(event: MouseEvent) {
    event.stopPropagation();
    this.deleteClicked.emit();
  }
  openAuction(event: MouseEvent) {
    event.stopPropagation();
    this.openClicked.emit();
  }
  updateAuction(event: MouseEvent) {
    event.stopPropagation();
    this.updateClicked.emit();
  }
}
