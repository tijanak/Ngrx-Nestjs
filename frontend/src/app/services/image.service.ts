import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { IImage } from '@org/models';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  postImagesForAuction(files: FileList, auctionId: number) {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    return this.httpClient.post<IImage[]>(
      `${environment.API_URL}images/${auctionId}`,
      formData,
      {}
    );
  }
  getImageForAuction(auctionId: number) {
    return this.httpClient.get<IImage[]>(
      `${environment.API_URL}images/auction/${auctionId}`
    );
  }
  deleteImage(id: number) {
    return this.httpClient.delete<void>(`${environment.API_URL}images/${id}`);
  }
}
