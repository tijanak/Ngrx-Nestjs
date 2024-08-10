import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-bid-create',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bid-create.component.html',
  styleUrl: './bid-create.component.css',
})
export class BidCreateComponent {
  bidForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BidCreateComponent>,
    private fb: FormBuilder
  ) {
    this.bidForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.bidForm.valid) {
      this.dialogRef.close(this.bidForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
