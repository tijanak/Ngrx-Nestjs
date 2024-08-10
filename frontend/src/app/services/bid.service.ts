// bid.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@org/environment';
import { CreateBidDto, IBid, UpdateBidDto } from '@org/models';

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private baseUrl = `${environment.API_URL}bid`;

  constructor(private http: HttpClient) {}

  createBid(auctionId: number, createBidDto: CreateBidDto): Observable<IBid> {
    console.log(createBidDto);
    return this.http.post<IBid>(`${this.baseUrl}/${auctionId}`, createBidDto);
  }

  getAllBids(): Observable<IBid[]> {
    return this.http.get<IBid[]>(`${this.baseUrl}/all`);
  }

  getBidById(id: number): Observable<IBid> {
    return this.http.get<IBid>(`${this.baseUrl}/${id}`);
  }

  updateBid(id: number, updateBidDto: UpdateBidDto): Observable<IBid> {
    return this.http.patch<IBid>(`${this.baseUrl}/${id}`, updateBidDto);
  }
  deleteBid(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getBidsForAuction(auctionId: number): Observable<IBid[]> {
    return this.http.get<IBid[]>(`${this.baseUrl}/auction/${auctionId}`);
  }
}
