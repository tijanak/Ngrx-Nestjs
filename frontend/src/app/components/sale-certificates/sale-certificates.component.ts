import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { ISale_Certificate } from '@org/models';
import { Subscription } from 'rxjs';
import { AppState } from '../../store/app.reducer';
import { selectAllCerts } from '../../store/sale-certificate/sale-certificate..selectors';
import { SaleCertificateComponent } from './sale-certificate/sale-certificate.component';

@Component({
  selector: 'app-sale-certificates',
  standalone: true,
  imports: [CommonModule, MatCardModule, SaleCertificateComponent],
  templateUrl: './sale-certificates.component.html',
  styleUrl: './sale-certificates.component.css',
})
export class SaleCertificatesComponent implements OnInit, OnDestroy {
  certificatesSubscription: Subscription;
  saleCertificates: ISale_Certificate[] = [];
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.certificatesSubscription = this.store
      .select(selectAllCerts)
      .subscribe((certs) => {
        this.saleCertificates = certs;
      });
  }
  ngOnDestroy(): void {
    if (this.certificatesSubscription)
      this.certificatesSubscription.unsubscribe();
  }
}
