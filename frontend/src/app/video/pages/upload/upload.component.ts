import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  videoService: VideoService = inject(VideoService);
  video!: File;
  url!: string;

  getFiles(event: Event): File[] {
    const files = (event.target as HTMLInputElement).files;
    return files ? Array.from(files) : [];
  }

  loadVideo(event: Event): void {
    const file = this.getFiles(event)[0];
    if (file) {
      this.video = file;
      this.url = URL.createObjectURL(this.video);
    }
  }

  uploadVideo(visibility: string): void {
    this.videoService.uploadVideo(this.video, visibility).subscribe((data) => {
      console.log(data);
    });
  }
}
