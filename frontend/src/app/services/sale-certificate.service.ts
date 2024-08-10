import { HttpClient } from '@angular/common/http';
import { Injectable } from '@nestjs/common';
import { environment } from '@org/environment';
import { SaleCertificate } from 'backend/src/modules/sale_certificate/sale_certificate.entity';
import { Observable } from 'rxjs';

@Injectable()
export class SaleCertificateService {
  constructor(private http: HttpClient) {}

  getUserCertificates(): Observable<SaleCertificate[]> {
    return this.http.get<SaleCertificate[]>(
      `${environment.API_URL}sale-certificate`
    );
  }
}
