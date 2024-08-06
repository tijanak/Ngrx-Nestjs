import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-auction-btn',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './new-auction-btn.component.html',
  styleUrl: './new-auction-btn.component.css',
})
export class NewAuctionBtnComponent {
  constructor(private router: Router) {}
  openAuctionCreationForm() {
    this.router.navigate(['/auction-create']);
  }
}
