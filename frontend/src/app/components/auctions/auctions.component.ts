import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction/auction.component';
import { IAuction, IUser } from '@org/models';
import { AuctionBasicInfoComponent } from './auction-basic-info/auction-basic-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { selectAuctions } from '../../store/auctions/auctions.selectors';
import {
  DeleteAuction,
  LoadAuctions,
} from '../../store/auctions/auctions.actions';
import { selectUser } from '../../store/auth/auth.selectors';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auctions',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AuctionBasicInfoComponent,
    MatCardModule,
    MatDivider,
  ],
  templateUrl: './auctions.component.html',
  styleUrl: './auctions.component.css',
})
export class AuctionsComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.subscription.push(
      this.store.select(selectAuctions).subscribe((auctions) => {
        this.auctions = auctions;
      })
    );
  }
  auctions: IAuction[] = [];
  deleteAuctionEvent(id: number) {
    this.store.dispatch(DeleteAuction({ id }));
  }
  open(id: number) {
    this.router.navigate(['/auction', id]);
  }
}
