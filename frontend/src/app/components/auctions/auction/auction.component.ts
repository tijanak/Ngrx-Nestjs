import { CommonModule } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { IAuction, IImage, IUser } from '@org/models';
import { AppState } from 'frontend/src/app/store/app.reducer';
import {
  DeleteAuction,
  UpdateAuction,
} from 'frontend/src/app/store/auctions/auctions.actions';
import { CreateBid } from 'frontend/src/app/store/bids/bids.actions';
import {
  deleteImage,
  uploadImages,
} from 'frontend/src/app/store/images/images.actions';
import { selectImagesForAuction } from 'frontend/src/app/store/images/images.selectors';
import { selectProfile } from 'frontend/src/app/store/user/user.selector';
import { Subscription } from 'rxjs';
import { BidFormComponent } from '../../bids/bid-form/bid-form.component';
import { BidsComponent } from '../../bids/bids.component';
import { AuctionBasicInfoComponent } from '../auction-basic-info/auction-basic-info.component';
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
  subscription: Subscription[] = [];
  imageSubscription: Subscription;
  constructor(
    private injector: Injector,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.isOwner = this.user != null && this.user.id == this.auction?.owner.id;
    if (changes['auction']) {
      if (this.auction)
        this.imageSubscription = this.store
          .select(selectImagesForAuction(this.auction!.id))
          .subscribe((images) => {
            this.images = [...images];
          });
    }
  }
  ngOnInit(): void {
    this.subscription.push(
      this.store.select(selectProfile).subscribe((user) => {
        this.user = user;
        this.isOwner =
          this.user != null && this.user.id == this.auction?.owner.id;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }

  @Input() auction!: IAuction | undefined;
  @Input() inList: boolean;
  images: IImage[] = [];
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
    this.store.dispatch(deleteImage({ id }));
  }
  uploadImg(images: FileList) {
    if (this.auction)
      this.store.dispatch(
        uploadImages({
          images: { ...images, length: images.length },
          auctionId: this.auction.id,
        })
      );
  }
}
