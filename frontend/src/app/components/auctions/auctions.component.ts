import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction/auction.component';
import { IAuction } from '@org/models';
import { AuctionBasicInfoComponent } from './auction-basic-info/auction-basic-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { selectAuctions } from '../../store/auctions/auctions.selectors';
import { LoadAuctions } from '../../store/auctions/auctions.actions';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [CommonModule, AuctionBasicInfoComponent, MatCardModule, MatDivider],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
})
export class AuctionsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private store: Store<AppState>) {
    this.store.dispatch(LoadAuctions());
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectAuctions)
      .subscribe((auctions) => {
        this.auctions = auctions;
      });
  }
  auctions: IAuction[] = [];
}
