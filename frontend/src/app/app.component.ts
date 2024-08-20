import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MessageSnackbarComponent } from './components/message-snackbar/message-snackbar.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { selectProfile } from './store/user/user.selector';
import { IUser } from '@org/models';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LoginComponent,
    MessageSnackbarComponent,
    MenuComponent,
    CommonModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'e-aukcije';
  userSubscription: Subscription;
  user: IUser | null = null;
  constructor(private store: Store<AppState>) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    this.userSubscription = this.store
      .select(selectProfile)
      .subscribe((user) => (this.user = user));
  }
}
