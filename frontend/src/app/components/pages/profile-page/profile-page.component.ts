import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuctionsComponent } from '../../auctions/auctions.component';
import { BidsComponent } from '../../bids/bids.component';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    MatTabsModule,
    AuctionsComponent,
    BidsComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
