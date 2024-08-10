import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ISale_Certificate } from '@org/models';
import { SaleCertificateComponent } from './sale-certificate/sale-certificate.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import { selectAllCerts } from '../../store/sale-certificate/sale-certificate..selectors';

@Component({
  selector: 'app-sale-certificates',
  standalone: true,
  imports: [CommonModule, MatCardModule, SaleCertificateComponent],
  templateUrl: './sale-certificates.component.html',
  styleUrl: './sale-certificates.component.css',
})
export class SaleCertificatesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store.select(selectAllCerts).subscribe((certs) => {
      this.saleCertificates = certs;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  saleCertificates: ISale_Certificate[] = [];
}
