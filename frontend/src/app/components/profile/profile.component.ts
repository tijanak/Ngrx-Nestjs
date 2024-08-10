import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { MenuComponent } from '../menu/menu.component';
import { SaleCertificateComponent } from '../sale-certificates/sale-certificate/sale-certificate.component';
import { IAuction, ISale_Certificate, IUser } from '@org/models';
import { SaleCertificatesComponent } from '../sale-certificates/sale-certificates.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { selectUser } from '../../store/auth/auth.selectors';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SaleCertificatesComponent,
    MenuComponent,
    UserComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: IUser | null;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectUser)
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
