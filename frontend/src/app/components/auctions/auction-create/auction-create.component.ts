import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { maxImageAmount } from '../../../validators/max-image-amount-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { CreateAuction } from 'frontend/src/app/store/auctions/auctions.actions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-auction-create',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './auction-create.component.html',
  styleUrl: './auction-create.component.css',
})
export class AuctionCreateComponent {
  auctionForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AuctionCreateComponent>
  ) {
    this.auctionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      min_price: [null, [Validators.required, Validators.min(1)]],
      start_time: [null, Validators.required],
      end_time: [null, Validators.required],
      images: [FileList, maxImageAmount(10)],
    });
  }
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files) {
      this.auctionForm.patchValue({
        images: fileInput.files,
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  onSubmit() {
    if (this.auctionForm.valid) {
      let formData = { ...this.auctionForm.value };
      this.dialogRef.close(formData);
    }
  }
}
