import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
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
import {
  DeleteAuction,
  UpdateAuction,
} from 'frontend/src/app/store/auctions/auctions.actions';
import { AuctionFormComponent } from '../auction-form/auction-form.component';

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
export class AuctionComponent implements OnInit, OnDestroy, OnChanges {
  subscription: Subscription;
  constructor(
    private injector: Injector,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.isOwner = this.user != null && this.user.id == this.auction?.owner.id;
  }
  ngOnInit(): void {
    this.subscription = this.store.select(selectProfile).subscribe((user) => {
      this.user = user;
      this.isOwner =
        this.user != null && this.user.id == this.auction?.owner.id;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  @Input() auction!: IAuction | undefined;
  @Input() inList: boolean;
  user: IUser | null;
  isOwner: boolean = false;
  @Output() openAuction = new EventEmitter<number>();
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
  openMoreInfo() {
    if (this.auction && this.inList) this.openAuction.emit(this.auction.id);
  }
  deleteAuction() {
    if (this.auction)
      this.store.dispatch(DeleteAuction({ id: this.auction.id }));
  }
  updateAuction() {
    if (this.auction) {
      const dialogRef = this.dialog.open(AuctionFormComponent, {
        width: '600px',
        data: {
          title: 'Azuriranje aukcije',
          auction: this.auction,
        },
        injector: this.injector,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          console.log(result);
          this.store.dispatch(
            UpdateAuction({
              id: this.auction!.id,
              updateDto: {
                ...result,
              },
            })
          );
        }
      });
    }
  }
  deleteImg(id: number) {
    alert(id);
  }
}
