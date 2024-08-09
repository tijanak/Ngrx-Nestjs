import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { IImage } from '@org/models';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}
  postImages(files: FileList) {
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    return this.httpClient.post<IImage[]>(
      `${environment.API_URL}images`,
      formData,
      {}
    );
  }
}
