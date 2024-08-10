import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { selectSelectedAuction } from 'frontend/src/app/store/auctions/auctions.selectors';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BidCreateComponent } from '../../bids/bid-create/bid-create.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateBid } from 'frontend/src/app/store/bids/bids.actions';
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
  subscription: Subscription;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.subscription = this.store
      .select(selectSelectedAuction)
      .subscribe((auction) => {
        if (auction)
          this.auction = {
            ...auction,
          };
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  @Input() auction!: IAuction | undefined;

  ngOnInit(): void {}
  openBidModal(): void {
    const dialogRef = this.dialog.open(BidCreateComponent, {
      width: '400px',
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
