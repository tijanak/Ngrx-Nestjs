import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidComponent } from './bid/bid.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { IBid } from '@org/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { selectAllBids } from '../../store/bids/bids.selector';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [CommonModule, BidComponent, MatCardModule, MatListModule],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css',
})
export class BidsComponent implements OnInit, OnDestroy {
  bids: IBid[] = [];
  subscription: Subscription;
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.store.select(selectAllBids).subscribe((bids) => {
      this.bids = bids;
      console.log(bids);
      this.bids.sort((a, b) => b.amount - a.amount);
    });
  }
}
