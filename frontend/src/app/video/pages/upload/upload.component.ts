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

  getFiles(event: Event): File[] {
    const files = (event.target as HTMLInputElement).files;
    return files ? Array.from(files) : [];
  }

  loadVideo(event: Event): void {
    const file = this.getFiles(event)[0];
    if (file) {
      this.video = file;
      console.log(this.video);
      
    }
  }

  uploadVideo(): void {
    this.videoService.uploadVideo(this.video).subscribe((data) => {
      console.log(data);
    });
  }
}
