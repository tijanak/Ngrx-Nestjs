import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../profile/profile.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ProfileComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {}
