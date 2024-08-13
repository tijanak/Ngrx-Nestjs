import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from '../../auctions/auction/auction.component';
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { skip, Subscription } from 'rxjs';
import { IAuction, IUser } from '@org/models';
import { selectSelectedAuction } from 'frontend/src/app/store/auctions/auctions.selectors';
import { selectProfile } from 'frontend/src/app/store/user/user.selector';

@Component({
  selector: 'app-auction-view-page',
  standalone: true,
  imports: [CommonModule, AuctionComponent],
  templateUrl: './auction-view-page.component.html',
  styleUrl: './auction-view-page.component.css',
})
export class AuctionViewPageComponent implements OnInit, OnDestroy {
  auction: IAuction | undefined;
  user: IUser | null;
  subscription: Subscription[] = [];
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscription.push(
      this.store
        .select(selectSelectedAuction)
        .pipe(skip(1))
        .subscribe((auction) => {
          this.auction = auction;
        })
    );
    this.subscription.push(
      this.store.select(selectProfile).subscribe((user) => (this.user = user))
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
