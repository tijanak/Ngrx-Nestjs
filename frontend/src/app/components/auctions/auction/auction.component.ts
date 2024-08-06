import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidsComponent } from '../../bids/bids.component';
import { IAuction, IBid } from '@org/models';
import { environment } from '@org/environment';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  CarouselModule,
  ThemeDirective,
} from '@coreui/angular';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuctionBasicInfoComponent } from '../auction-basic-info/auction-basic-info.component';
@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    AuctionBasicInfoComponent,
    CommonModule,
    BidsComponent,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css',
})
export class AuctionComponent implements OnInit {
  @Input() auction!: IAuction;
  bids: IBid[] = [
    {
      id: 2,
      time_created: new Date(),
      amount: 500,
      bidder: {
        id: 2,
        name: 'tijana',
        surname: 'kvaic',
        email: 'kv.tijana',
        phone_number: '+3819656',
        auctions: [],
        bids: [],
      },
      auction: {
        id: 5,
        min_price: 5,
        start_time: new Date(),
        end_time: new Date(),
        title: 'naziv',
        description: 'opis',
        categories: [],
        owner: {
          id: 2,
          name: 'tijana',
          surname: 'kvaic',
          email: 'kv.tijana',
          phone_number: '+3819656',
          auctions: [],
          bids: [],
        },
        images: [],
        sale_certificate: null,
        bids: [],
      },
      sale_certificate: null,
    },
    {
      id: 2,
      time_created: new Date(),
      amount: 1500,
      bidder: {
        id: 2,
        name: 'nzm',
        surname: 'nbtn',
        email: 'kv.tijana',
        phone_number: '+3819656',
        auctions: [],
        bids: [],
      },
      auction: {
        id: 5,
        min_price: 5,
        start_time: new Date(),
        end_time: new Date(),
        title: 'naziv',
        description: 'opis',
        categories: [],
        owner: {
          id: 2,
          name: 'tijana',
          surname: 'kvaic',
          email: 'kv.tijana',
          phone_number: '+3819656',
          auctions: [],
          bids: [],
        },
        images: [],
        sale_certificate: null,
        bids: [],
      },
      sale_certificate: null,
    },
  ];
  ngOnInit(): void {
    this.auction.bids = this.bids;
  }
}
