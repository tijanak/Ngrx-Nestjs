import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordsMatchValidator } from 'frontend/src/app/validators/password-match.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() }
    );
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { password } = this.passwordForm.value;
      this.dialogRef.close(password);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
