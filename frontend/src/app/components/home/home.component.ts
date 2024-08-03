import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { logout } from '../../store/auth/auth.actions';
import { selectAuthFeature } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {}
  ngOnInit(): void {
    this.store.select(selectAuthFeature).subscribe((auth) => {
      if (auth.loggedIn == false) this.router.navigate(['/login']);
    });
  }
  logout() {
    this.store.dispatch(logout());
  }
}
