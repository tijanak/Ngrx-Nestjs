import { CommonModule } from '@angular/common';
import { Component, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { CreateAuction } from 'frontend/src/app/store/auctions/auctions.actions';
import { AuctionFormComponent } from '../auction-form/auction-form.component';

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
    const dialogRef = this.dialog.open(AuctionFormComponent, {
      width: '600px',
      data: { title: 'Napravi aukciju' },
      injector: this.injector,
    });

    dialogRef.afterClosed().subscribe((result) => {
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
