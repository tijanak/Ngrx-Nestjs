import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidsComponent } from '../../bids/bids.component';
import { IAuction, IBid, IUser } from '@org/models';
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
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { selectSelectedAuction } from 'frontend/src/app/store/auctions/auctions.selectors';
import { skip, Subscription, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BidFormComponent } from '../../bids/bid-form/bid-form.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateBid } from 'frontend/src/app/store/bids/bids.actions';
import { selectProfile } from 'frontend/src/app/store/user/user.selector';
@Component({
  selector: 'app-auction',
  standalone: true,
  imports: [
    AuctionBasicInfoComponent,
    CommonModule,
    BidsComponent,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './auction.component.html',
  styleUrl: './auction.component.css',
})
export class AuctionComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  @Input() auction!: IAuction | undefined;
  user: IUser | null;
  ngOnInit(): void {
    this.subscription.push(
      this.store
        .select(selectSelectedAuction)
        .pipe(skip(1))
        .subscribe((auction) => {
          if (auction)
            this.auction = {
              ...auction,
            };
          console.log(this.auction);
        })
    );
    this.subscription.push(
      this.store.select(selectProfile).subscribe((user) => (this.user = user))
    );
  }
  openBidModal(): void {
    const dialogRef = this.dialog.open(BidFormComponent, {
      width: '400px',
      data: {
        title: 'Postavite ponudu',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          CreateBid({
            auctionId: this.auction!.id,
            createBidDto: { amount: result.amount },
          })
        );
      }
    });
  }
}
