import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAuction, ISale_Certificate } from '@org/models';
import { MatCardModule } from '@angular/material/card';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';

@Component({
  selector: 'app-sale-certificate',
  standalone: true,
  imports: [CommonModule, MatCardModule, ImageGalleryComponent],
  templateUrl: './sale-certificate.component.html',
  styleUrl: './sale-certificate.component.css',
})
export class SaleCertificateComponent {
  @Input() saleCertificate!: ISale_Certificate;
}
