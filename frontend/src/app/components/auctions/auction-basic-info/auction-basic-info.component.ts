import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuction, IBid } from '@org/models';
import { environment } from '@org/environment';
import { MatCardModule } from '@angular/material/card';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
} from '@coreui/angular';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { MatButtonModule } from '@angular/material/button';

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
export class AuctionBasicInfoComponent implements OnInit {
  ngOnInit(): void {}
  @Input() auction!: IAuction;
  @Input() userCanModify: boolean;
  @Output() deleteClicked = new EventEmitter<number>();
  @Input() isInList: boolean = false;
  deleteAuction(event: MouseEvent) {
    event.stopPropagation();
    this.deleteClicked.emit(this.auction.id);
  }
}
