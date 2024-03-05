import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent {
  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  videoService: VideoService = inject(VideoService);

  getVideoUrl() {
    this._activatedRoute.params.subscribe(({ id }) => {
      this.videoService.getVideo(`${id}.mp4`).subscribe((data) => {
        document.getElementById('videoplayer')!.setAttribute('src', data.url);
      });
    });
  }
}
