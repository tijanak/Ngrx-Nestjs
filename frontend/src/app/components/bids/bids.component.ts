import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidComponent } from './bid/bid.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { IBid, IUser } from '@org/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Subscription } from 'rxjs';
import { selectAllBids } from '../../store/bids/bids.selector';
import { selectProfile } from '../../store/user/user.selector';
import { DeleteBid, UpdateBid } from '../../store/bids/bids.actions';
import { MatDialog } from '@angular/material/dialog';
import { BidFormComponent } from './bid-form/bid-form.component';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [CommonModule, BidComponent, MatCardModule, MatListModule],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css',
})
export class BidsComponent implements OnInit, OnDestroy {
  bids: IBid[] = [];
  subscription: Subscription[] = [];
  user: IUser | null;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  ngOnInit(): void {
    this.subscription.push(
      this.store.select(selectAllBids).subscribe((bids) => {
        this.bids = bids;
        console.log(bids);
        this.bids.sort((a, b) => b.amount - a.amount);
      })
    );
    this.subscription.push(
      this.store.select(selectProfile).subscribe((user) => (this.user = user))
    );
  }
  deleteBidEvent(id: number) {
    this.store.dispatch(DeleteBid({ id }));
  }
  updateBidEvent(id: number) {
    const dialogRef = this.dialog.open(BidFormComponent, {
      width: '400px',
      data: {
        title: 'Povecajte ponudu',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          UpdateBid({ id, updateBidDto: { amount: result.amount } })
        );
      }
    });
  }
}
