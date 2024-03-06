import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.url;

  private _httpClient: HttpClient = inject(HttpClient);

  login(body: { username: string; password: string }) {
    return this._httpClient.post<{ token: string; role: string }>(
      `${this.url}/auth/login`,
      body
    );
  }

  register(body: { username: string; password: string }) {
    return this._httpClient.post(`${this.url}/auth/register`, body);
  }

  changePassword(password: string) {
    return this._httpClient.put<{ action: string }>(
      `${this.url}/change-password`,
      {
        password,
      }
    );
  }
}
