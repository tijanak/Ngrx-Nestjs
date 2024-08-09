import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, LogoutComponent, MenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {}
