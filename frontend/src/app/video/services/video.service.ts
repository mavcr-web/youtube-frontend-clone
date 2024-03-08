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

  uploadVideo(video: File, thumbnail: File, visibility: string) {
    const formData: FormData = new FormData();
    formData.append('video', video);
    formData.append('video', thumbnail);
    return this._httpClient.post(`${this.path}/${visibility}`, formData);
  }

  uploadThumbnail(thumbnail: File, id: string) {
    const formData: FormData = new FormData();
    formData.append('thumbnail', thumbnail);
    return this._httpClient.post(`${this.path}/thumbnail/${id}`, formData);
  }

  getVideo(id: number) {
    return this._httpClient.get<{ url: string }>(`${this.path}/${id}`);
  }

  getThumbnail(id: number) {
    return this._httpClient.get<{ url: string }>(
      `${this.path}/thumbnail/${id}`
    );
  }

  getVideos() {
    return this._httpClient.get<[]>(`${this.path}`);
  }

  getMyVideos() {
    return this._httpClient.get<[]>(`${this.path}/my-videos`);
  }

  delete(id: number) {
    return this._httpClient.delete(`${this.path}/${id}`);
  }
}
