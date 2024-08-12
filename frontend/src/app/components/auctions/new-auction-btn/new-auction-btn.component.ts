import { Component, Injector, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuctionCreateComponent } from '../auction-create/auction-create.component';
import { UpdateAuctionDto } from '@org/models';
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { CreateAuction } from 'frontend/src/app/store/auctions/auctions.actions';

@Component({
  selector: 'app-new-auction-btn',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './new-auction-btn.component.html',
  styleUrl: './new-auction-btn.component.css',
})
export class NewAuctionBtnComponent {
  constructor(
    private dialog: MatDialog,
    private injector: Injector,
    private store: Store<AppState>
  ) {}

  openAuctionCreationForm() {
    const dialogRef = this.dialog.open(AuctionCreateComponent, {
      width: '600px',
      injector: this.injector,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.store.dispatch(
        CreateAuction({
          auctionDto: {
            title: result.title,
            description: result.description,
            min_price: result.min_price,
            end_time: result.end_time,
            start_time: result.start_time,
            images: Array(),
          },
          images: { ...result.images, length: result.images.length },
        })
      );
    });
  }
}
