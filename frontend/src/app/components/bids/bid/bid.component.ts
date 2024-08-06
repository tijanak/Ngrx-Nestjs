import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBid } from '@org/models';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css',
})
export class BidComponent {
  @Input() bid: IBid;
  onDelete() {
    alert('klik ' + this.bid.amount);
  }
}
