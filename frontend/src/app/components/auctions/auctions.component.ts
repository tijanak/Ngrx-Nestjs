import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuction } from '@org/models';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { selectAuctions } from '../../store/auctions/auctions.selectors';
import { AuctionBasicInfoComponent } from './auction-basic-info/auction-basic-info.component';
import { AuctionComponent } from './auction/auction.component';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AuctionBasicInfoComponent,
    MatCardModule,
    MatDivider,
    AuctionComponent,
  ],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
})
export class AuctionsComponent implements OnInit, OnDestroy {
  auctionsSubscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnDestroy(): void {
    if (this.auctionsSubscription) this.auctionsSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.auctionsSubscription = this.store
      .select(selectAuctions)
      .subscribe((auctions) => {
        this.auctions = auctions;
      });
  }
  auctions: IAuction[] = [];

  open(id: number) {
    this.router.navigate(['/auction', id]);
  }
}
