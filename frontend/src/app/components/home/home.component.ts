import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { logout } from '../../store/auth/auth.actions';
import {
  selectAuthFeature,
  selectLoggedIn,
} from '../../store/auth/auth.selectors';
import { skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>, private router: Router) {}
  private loginListener: Subscription;
  ngOnInit(): void {
    this.loginListener = this.store
      .select(selectLoggedIn)

      .pipe(skip(1))
      .subscribe((loggedIn) => {
        if (loggedIn == false) this.router.navigate(['/login']);
      });
  }
  logout() {
    this.store.dispatch(logout());
  }
  ngOnDestroy(): void {
    if (this.loginListener) this.loginListener.unsubscribe();
  }
}
