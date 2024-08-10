import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../logout/logout.component';
import { MenuComponent } from '../menu/menu.component';
import { SaleCertificateComponent } from '../sale-certificates/sale-certificate/sale-certificate.component';
import { IAuction, ISale_Certificate } from '@org/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SaleCertificateComponent, MenuComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  sampleSaleCertificate: ISale_Certificate = {
    id: 1,
    time_granted: new Date('2024-08-10T12:00:00Z'),
    winning_bid: {
      id: 1,
      time_created: new Date('2024-08-10T11:00:00Z'),
      amount: 1500,
      bidder: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+38123456789',
        auctions: [],
        bids: [],
      },
      auction: {} as IAuction,
      sale_certificate: null,
    },
    auction: {
      id: 1,
      min_price: 1000,
      start_time: new Date('2024-08-01T10:00:00Z'),
      end_time: new Date('2024-08-15T10:00:00Z'),
      title: 'Antique Vase',
      description: 'A beautiful antique vase from the 19th century.',
      categories: [],
      owner: {
        id: 2,
        name: 'Alice',
        surname: 'Smith',
        email: 'alice.smith@example.com',
        phone_number: '+38198765432',
        auctions: [],
        bids: [],
      },
      images: [],
      sale_certificate: null,
      bids: [],
    },
  };
}
