import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@org/environment';
import { IUser, UpdateUserDto } from '@org/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  updateProfile(updateDto: UpdateUserDto) {
    return this.httpClient.patch<IUser>(
      `${environment.API_URL}user`,
      updateDto
    );
  }
}
