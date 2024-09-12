import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IAuction } from '@org/models';
import { maxImageAmount } from '../../../validators/max-image-amount-validator';
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
  templateUrl: './auction-form.component.html',
  styleUrl: './auction-form.component.css',
})
export class AuctionFormComponent {
  auctionForm: FormGroup;
  isLoading: boolean = false;
  formTitle: string;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuctionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; auction?: IAuction }
  ) {
    this.formTitle = this.data.title;
    this.auctionForm = this.fb.group({
      title: [data.auction?.title ?? '', Validators.required],
      description: [data.auction?.description ?? '', Validators.required],
      min_price: [
        data.auction?.min_price ?? null,
        [Validators.required, Validators.min(1)],
      ],
      start_time: [
        data.auction?.start_time ? new Date(data.auction?.start_time) : null,
        Validators.required,
      ],
      end_time: [
        data.auction?.end_time ? new Date(data.auction?.end_time) : null,
        Validators.required,
      ],
    });
    if (!data.auction) {
      this.auctionForm.addControl(
        'images',
        this.fb.control(FileList, maxImageAmount(10))
      );
    }
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
      formData.start_time.setSeconds(0);
      formData.end_time.setSeconds(0);
      this.dialogRef.close(formData);
    }
  }
}
