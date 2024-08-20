import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { SaleCertificatesComponent } from '../../sale-certificates/sale-certificates.component';

@Component({
  selector: 'app-sale-certificate-page',
  standalone: true,
  imports: [CommonModule, MenuComponent, SaleCertificatesComponent],
  templateUrl: './sale-certificate-page.component.html',
  styleUrl: './sale-certificate-page.component.css',
})
export class SaleCertificatePageComponent {}
