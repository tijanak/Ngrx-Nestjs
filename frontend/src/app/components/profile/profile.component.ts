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
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SaleCertificatesComponent,
    MenuComponent,
    UserComponent,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: IUser | null;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.subscription = this.store
      .select(selectUser)
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Updated user data:', result);
        this.user = { ...this.user, ...result };
      }
    });
  }
}
