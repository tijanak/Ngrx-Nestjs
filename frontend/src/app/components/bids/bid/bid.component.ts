import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { IBid } from '@org/models';

@Component({
  selector: 'app-bid',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css',
})
export class BidComponent {
  @Input() bid: IBid;
  @Input() isEditable: boolean;
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() updateClicked = new EventEmitter<number>();
  onDelete() {
    this.deleteClicked.next(this.bid.id);
  }
  onUpdate() {
    this.updateClicked.next(this.bid.id);
  }
}
