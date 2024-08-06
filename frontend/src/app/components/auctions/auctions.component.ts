import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction/auction.component';
import { IAuction } from '@org/models';
import { AuctionBasicInfoComponent } from './auction-basic-info/auction-basic-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule, AuctionBasicInfoComponent, MatCardModule, MatDivider],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
})
export class AuctionsComponent {
  auctions: IAuction[] = [
    {
      id: 1,
      min_price: 100.0,
      start_time: new Date('2024-08-01T10:00:00Z'),
      end_time: new Date('2024-08-15T18:00:00Z'),
      title: 'Vintage Car Auction',
      description: 'An auction featuring classic vintage cars from the 1960s.',
      categories: [
        {
          id: 1,
          name: 'Classic Cars',
          auctions: [],
        },
      ],
      owner: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+1234567890',
        auctions: [],
        bids: [],
      },
      images: [
        {
          id: 1,
          fileName: 'download.png',
        },
        {
          id: 2,
          fileName: '1722888791138_driving.png',
        },
      ],
      sale_certificate: null,
      bids: [],
    },
    {
      id: 1,
      min_price: 100.0,
      start_time: new Date('2024-08-01T10:00:00Z'),
      end_time: new Date('2024-08-15T18:00:00Z'),
      title: 'Vintage Salt Auction',
      description: 'An auction featuring classic salt cars from the 1990s.',
      categories: [
        {
          id: 1,
          name: 'Classic Cars',
          auctions: [],
        },
      ],
      owner: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+1234567890',
        auctions: [],
        bids: [],
      },
      images: [
        {
          id: 1,
          fileName: 'download.png',
        },
        {
          id: 2,
          fileName: '1722888791138_driving.png',
        },
      ],
      sale_certificate: null,
      bids: [],
    },
  ];
}
