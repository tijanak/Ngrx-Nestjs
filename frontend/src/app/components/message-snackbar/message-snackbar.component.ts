import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { merge, Subscription } from 'rxjs';
import { selectAuthError } from '../../store/auth/auth.selectors';
import { selectAuctionError } from '../../store/auctions/auctions.selectors';
import { selectBidErrors } from '../../store/bids/bids.selector';
import { selectCertErrors } from '../../store/sale-certificate/sale-certificate..selectors';
import { selectUserError } from '../../store/user/user.selector';
import { selectImageError } from '../../store/images/images.selectors';

@Component({
  selector: 'app-message-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-snackbar.component.html',
  styleUrl: './message-snackbar.component.css',
})
export class MessageSnackbarComponent implements OnInit, OnDestroy {
  private error$: Subscription;
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.error$ = merge(
      this.store.select(selectAuctionError),
      this.store.select(selectAuthError),
      this.store.select(selectBidErrors),
      this.store.select(selectCertErrors),
      this.store.select(selectUserError),
      this.store.select(selectImageError)
    ).subscribe((error) => {
      console.log(error);
      if (error && error.error && error.error.message) {
        this.snackBar.open(error.error.message, 'Close', {
          duration: 2000,
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.error$.unsubscribe();
  }
}
