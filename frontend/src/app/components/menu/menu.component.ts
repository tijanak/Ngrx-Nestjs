import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    LogoutComponent,
    MatToolbarModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
