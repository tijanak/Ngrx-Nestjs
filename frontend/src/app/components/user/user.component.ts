import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IUser } from '@org/models';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input() user: IUser | null;
}
