import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = environment.url;

  path = `${this.url}/user`;
  _httpClient: HttpClient = inject(HttpClient);

  getChannel(id: number) {
    return this._httpClient.get<string>(`${this.path}/channel/${id}`);
  }
}
