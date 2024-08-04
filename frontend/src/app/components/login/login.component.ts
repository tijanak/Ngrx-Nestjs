import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { login } from '../../store/auth/auth.actions';
import {
  selectAuthFeature,
  selectLoggedIn,
} from '../../store/auth/auth.selectors';
import { MatCardModule } from '@angular/material/card';
import { skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  private loginListener: Subscription;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loginListener = this.store
      .select(selectLoggedIn)
      .pipe(skip(1))
      .subscribe((loggedIn) => {
        if (loggedIn) {
          this.router.navigate(['/home']);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.loginListener) this.loginListener.unsubscribe();
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.store.dispatch(
        login({
          email: this.form.value.email,
          password: this.form.value.password,
        })
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
