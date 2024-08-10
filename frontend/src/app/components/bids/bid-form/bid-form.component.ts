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
  selector: 'app-bid-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bid-form.component.html',
  styleUrl: './bid-form.component.css',
})
export class BidFormComponent {
  bidForm: FormGroup;
  title: string;
  constructor(
    public dialogRef: MatDialogRef<BidFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.title = data.title;
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
