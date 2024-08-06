import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  templateUrl: './auction-create.component.html',
  styleUrl: './auction-create.component.css',
})
export class AuctionCreateComponent {
  auctionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.auctionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      min_price: [null, [Validators.required, Validators.min(0)]],
      start_time: [null, Validators.required],
      end_time: [null, Validators.required],
      images: [null],
    });
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.auctionForm.patchValue({
        images: fileInput.files,
      });
    }
  }

  onSubmit() {
    if (this.auctionForm.valid) {
      // Handle form submission
      console.log(this.auctionForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
