import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '@org/models';
import { MatCardModule } from '@angular/material/card';

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
