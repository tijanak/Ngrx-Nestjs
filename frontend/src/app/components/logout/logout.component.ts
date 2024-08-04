import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { selectLoggedIn } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private store: Store<AppState>, private router: Router) {}
  private loginListener: Subscription;
  ngOnInit(): void {
    this.loginListener = this.store
      .select(selectLoggedIn)

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
