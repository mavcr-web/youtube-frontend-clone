import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url: string = environment.url;

  path = `${this.url}/video`;
  _httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  uploadVideo(video: File) {
    const formData: FormData = new FormData();
    formData.append('video', video);
    return this._httpClient.post(`${this.path}`, formData);
  }

  getVideo(id: string) {
    return this._httpClient.get<{ url: string }>(`${this.path}/${id}`);
  }
}
