import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuction } from '@org/models';
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

@Component({
  selector: 'app-auction-basic-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselInnerComponent,
    RouterLink,
    MatIconModule,
    CarouselModule,
  ],
  templateUrl: './auction-basic-info.component.html',
  styleUrl: './auction-basic-info.component.css',
})
export class AuctionBasicInfoComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.auction);
  }
  @Input() auction!: IAuction;
  imageBaseUrl = `${environment.API_URL}images/`;
}
