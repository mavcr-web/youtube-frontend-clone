import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css',
})
export class ThumbnailComponent {
  videoService: VideoService = inject(VideoService);
  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  thumbnail!: File;
  url!: string;
  id!: string;

  getFiles(event: Event): File[] {
    const files = (event.target as HTMLInputElement).files;
    return files ? Array.from(files) : [];
  }

  loadThumbnail(event: Event): void {
    const file = this.getFiles(event)[0];
    if (file) {
      this.thumbnail = file;
      this.url = URL.createObjectURL(this.thumbnail);
    }
  }

  uploadThumbnail(): void {
    this._activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
    });

    this.videoService
      .uploadThumbnail(this.thumbnail, this.id)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
