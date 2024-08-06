import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidComponent } from './bid/bid.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { IBid } from '@org/models';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [CommonModule, BidComponent, MatCardModule, MatListModule],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css',
})
export class BidsComponent implements OnInit {
  @Input() bids: IBid[] = [];
  constructor() {}
  ngOnInit(): void {
    this.bids.sort((a, b) => b.amount - a.amount);
  }
}
