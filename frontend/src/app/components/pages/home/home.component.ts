import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { AuctionsComponent } from '../../auctions/auctions.component';
import { NewAuctionBtnComponent } from '../../auctions/new-auction-btn/new-auction-btn.component';
import { LogoutComponent } from '../../logout/logout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    LogoutComponent,
    AuctionsComponent,
    NewAuctionBtnComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor() {}
}
