import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { CreateAuctionDto, IAuction, UpdateAuctionDto } from '@org/models';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  constructor(private httpClient: HttpClient) {}
  getAuctions() {
    return this.httpClient.get<IAuction[]>(`${environment.API_URL}auction/all`);
  }
  getAuction(id: number) {
    return this.httpClient.get<IAuction>(`${environment.API_URL}auction/${id}`);
  }
  getAuctionsForUser() {
    return this.httpClient.get<IAuction[]>(`${environment.API_URL}auction`);
  }
  createAuction(auction: CreateAuctionDto) {
    return this.httpClient.post<IAuction>(
      `${environment.API_URL}auction`,
      auction,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  deleteAuction(id: number) {
    return this.httpClient.delete<number>(
      `${environment.API_URL}auction/${id}`
    );
  }
  updateAuction(id: number, updateDto: UpdateAuctionDto) {
    return this.httpClient.patch<IAuction>(
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
