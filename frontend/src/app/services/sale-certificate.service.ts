import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { SaleCertificate } from 'backend/src/modules/sale_certificate/sale_certificate.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaleCertificateService {
  constructor(private http: HttpClient) {}

  getUserCertificates(): Observable<SaleCertificate[]> {
    return this.http.get<SaleCertificate[]>(
      `${environment.API_URL}sale-certificate`
    );
  }
}
