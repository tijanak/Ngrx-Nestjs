import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { CreateAuctionDto, UpdateAuctionDto } from '@org/models';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(private httpClient: HttpClient) {}
  getAuctions() {
    return this.httpClient.get<any>(`${environment.API_URL}auction/all`);
  }
  getAuction(id: number) {
    return this.httpClient.get<any>(`${environment.API_URL}auction/${id}`);
  }
  createAuction(auction: CreateAuctionDto) {
    return this.httpClient.post(`${environment.API_URL}auction`, auction, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  deleteAuction(id: number) {
    return this.httpClient.delete(`${environment.API_URL}auction/${id}`);
  }
  updateAuction(id: number, updateDto: UpdateAuctionDto) {
    return this.httpClient.put(
      `${environment.API_URL}auction/${id}`,
      updateDto,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
