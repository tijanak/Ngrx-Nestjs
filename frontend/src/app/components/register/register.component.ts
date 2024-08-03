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

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}
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
  }

  onSubmit(): void {
    if (this.registerForm?.valid) {
      // Handle form submission
      const formValues = this.registerForm.value;
      console.log('Form Submitted', formValues);

      // Example notification
      this.snackBar.open('Registration successful!', 'Close', {
        duration: 2000,
      });

      // Clear the form
      this.registerForm.reset();
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 2000,
      });
    }
  }
}
