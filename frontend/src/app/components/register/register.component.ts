import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import {
  selectAuthError,
  selectAuthFeature,
  selectLoggedIn,
} from '../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { registration } from '../../store/auth/auth.actions';
import { error } from 'console';
import { Subscription, pipe, skip } from 'rxjs';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup | undefined;

  private subscriptions: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)],
      ],
    });
    this.subscriptions.push(
      this.store
        .select(selectAuthError)
        .pipe(skip(1))
        .subscribe((error) => {
          if (error) {
            this.snackBar.open(error.error.message, 'Close', {
              duration: 2000,
            });
          }
        })
    );
    this.subscriptions.push(
      this.store
        .select(selectLoggedIn)
        .pipe(skip(1))
        .subscribe((loggedIn) => {
          if (loggedIn) {
            this.router.navigate(['/home']);
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  onSubmit(): void {
    if (this.registerForm?.valid) {
      const formValues = this.registerForm.value;
      console.log('Form Submitted', formValues);
      this.store.dispatch(
        registration({
          name: formValues.name,
          surname: formValues.surname,
          phone_number: formValues.phoneNumber,
          password: formValues.password,
          email: formValues.email,
        })
      );
    }
  }
}
