import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuctionsComponent } from '../auctions/auctions.component';
import { NewAuctionBtnComponent } from '../auctions/new-auction-btn/new-auction-btn.component';
import { MenuComponent } from '../menu/menu.component';

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
    MenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
