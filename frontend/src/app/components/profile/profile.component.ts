import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LogoutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
