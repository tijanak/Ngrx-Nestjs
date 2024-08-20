import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ISale_Certificate } from '@org/models';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { UserComponent } from '../../user/user.component';

@Component({
  selector: 'app-sale-certificate',
  standalone: true,
  imports: [CommonModule, MatCardModule, ImageGalleryComponent, UserComponent],
  templateUrl: './sale-certificate.component.html',
  styleUrl: './sale-certificate.component.css',
})
export class SaleCertificateComponent {
  @Input() saleCertificate!: ISale_Certificate;
}
