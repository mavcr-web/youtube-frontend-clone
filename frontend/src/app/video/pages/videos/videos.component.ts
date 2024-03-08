import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  videoService: VideoService = inject(VideoService);

  list: any[] = [];

  ngOnInit() {
    this.videoService.getMyVideos().subscribe((data) => {
      this.list = data;
    });
  }

  removeFromlist(id: string) {
    this.list = this.list.filter((v) => v.id !== id);
  }
}
