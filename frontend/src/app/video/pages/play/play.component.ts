import { Component, afterNextRender, inject } from '@angular/core';
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

  ngOnInit() {
    this.getVideoUrl();
  }

  getVideoUrl() {
    this._activatedRoute.params.subscribe(({ id }) => {
      this.videoService.getVideo(id).subscribe((data) => {
        document.getElementById('videoplayer')!.setAttribute('src', data.url);
      });
    });
  }

  shareUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }
}
