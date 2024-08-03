import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { selectAuthFeature } from '../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { registration } from '../../store/auth/auth.actions';
import { error } from 'console';
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
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | undefined;

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
    this.store.select(selectAuthFeature).subscribe((auth) => {
      if (auth.loggedIn) {
        this.router.navigate(['/home']);
        alert(auth.loggedIn);
        alert(auth.error);
      }
      if (auth.error) {
        console.log(auth.error.error);
        this.snackBar.open(auth.error.error.message, 'Close', {
          duration: 2000,
        });
      }
    });
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
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 2000,
      });
    }
  }
}
