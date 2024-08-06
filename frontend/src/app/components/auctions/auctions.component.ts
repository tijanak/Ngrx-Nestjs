import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction/auction.component';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule, AuctionComponent],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
})
export class AuctionsComponent {}
