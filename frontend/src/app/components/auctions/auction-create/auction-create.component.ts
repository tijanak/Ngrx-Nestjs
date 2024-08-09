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
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { maxImageAmount } from './validators/max-image-amount-validator';
import { Store } from '@ngrx/store';
import { AppState } from 'frontend/src/app/store/app.reducer';
import { CreateAuction } from 'frontend/src/app/store/auctions/auctions.actions';

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
  ],
  templateUrl: './auction-create.component.html',
  styleUrl: './auction-create.component.css',
})
export class AuctionCreateComponent {
  auctionForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
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

  onSubmit() {
    if (this.auctionForm.valid) {
      console.log(this.auctionForm.value);
      let formData = { ...this.auctionForm.value };
      console.log(formData.images);
      this.store.dispatch(
        CreateAuction({
          auctionDto: {
            title: formData.title,
            description: formData.description,
            min_price: formData.min_price,
            end_time: formData.end_time,
            start_time: formData.start_time,
            images: Array(),
          },
          images: { ...formData.images, length: formData.images.length },
        })
      );
    }
  }
}
