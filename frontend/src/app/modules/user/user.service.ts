import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = environment.url;
  _router: Router = inject(Router);

  path = `${this.url}/user`;
  _httpClient: HttpClient = inject(HttpClient);

  getChannel(id: number) {
    return this._httpClient.get(`${this.path}/${id}`);
  }

  isNew() {
    this._httpClient.post(`${this.path}/new`, {}).subscribe((data) => {
      if (data) {
        sessionStorage.setItem('start', 'start');
        this._router.navigate(['/register-admin']);
      }
    });
  }
}
