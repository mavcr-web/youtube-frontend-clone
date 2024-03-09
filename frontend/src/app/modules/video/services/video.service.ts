import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  url: string = environment.url;

  path = `${this.url}/video`;
  _httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  uploadVideo(
    video: File,
    thumbnail: File,
    visibility: string,
    name: string,
    description: string
  ) {
    console.log(video, thumbnail, visibility, name, description);

    const formData: FormData = new FormData();
    formData.append('video', video);
    formData.append('video', thumbnail);
    return this._httpClient.post(
      `${this.path}/${visibility}?name=${name}&description=${description}`,
      formData
    );
  }

  uploadThumbnail(thumbnail: File, id: string) {
    const formData: FormData = new FormData();
    formData.append('thumbnail', thumbnail);
    return this._httpClient.post(`${this.path}/thumbnail/${id}`, formData);
  }

  getVideo(id: number) {
    return this._httpClient.get<{ url: string; idUser: string }>(
      `${this.path}/${id}`
    );
  }

  getOneVideo(id: number) {
    return this._httpClient.get<{}>(`${this.path}/entity/${id}`);
  }

  getThumbnail(id: number) {
    return this._httpClient.get<{ url: string }>(
      `${this.path}/thumbnail/${id}`
    );
  }

  getVideos(title: string) {
    return this._httpClient.get<[]>(`${this.path}?title=${title}`);
  }

  getMyVideos() {
    return this._httpClient.get<[]>(`${this.path}/my-videos`);
  }

  getChannelVideos(id: number) {
    return this._httpClient.get<[]>(`${this.path}/channel-videos/${id}`);
  }

  delete(id: number) {
    return this._httpClient.delete(`${this.path}/${id}`);
  }

  // History

  addToHistory(id: number) {
    return this._httpClient.post(`${this.url}/history`, {
      idUser: 0,
      idVideo: id,
    });
  }

  getHistory() {
    return this._httpClient.get<[]>(`${this.url}/history`);
  }

  // Likes
  addLike(id: number) {
    return this._httpClient.post(`${this.url}/like-video`, {
      idUser: 0,
      idVideo: id,
    });
  }

  getLikesCount(id: number) {
    return this._httpClient.get<number>(`${this.url}/like-video?id=${id}`);
  }

  getLike(id: number) {
    return this._httpClient.get<boolean>(`${this.url}/like-video/${id}`);
  }

  removeLike(id: number) {
    return this._httpClient.delete(`${this.url}/like-video/${id}`);
  }
}
