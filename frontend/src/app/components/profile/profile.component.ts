import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { IUser } from '@org/models';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { UpdateUser } from '../../store/user/user.actions';
import { selectProfile } from '../../store/user/user.selector';
import { MenuComponent } from '../menu/menu.component';
import { SaleCertificatesComponent } from '../sale-certificates/sale-certificates.component';
import { UserComponent } from '../user/user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    SaleCertificatesComponent,
    MenuComponent,
    UserComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: IUser | null;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.userSubscription = this.store
      .select(selectProfile)
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(ProfileUpdateComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UpdateUser({ updateDto: result }));
      }
    });
  }
  openPasswordChangeDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(UpdateUser({ updateDto: { password: result } }));
      }
    });
  }
}
