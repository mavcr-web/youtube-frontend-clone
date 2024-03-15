import { Component, afterNextRender, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute } from '@angular/router';
import { CommentsComponent } from '../../components/comments/comments.component';
import { LikeComponent } from '../../components/like/like.component';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommentsComponent, LikeComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css',
})
export class PlayComponent {
  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  videoService: VideoService = inject(VideoService);
  idUser: string = '';
  token = sessionStorage.getItem('token');
  id: number = 0;

  ngOnInit() {
    this.getVideoUrl();
  }

  getVideoUrl() {
    this._activatedRoute.params.subscribe(({ id }) => {
      this.videoService.getVideo(id).subscribe((data) => {
        this.id = parseInt(id);
        document.getElementById('videoplayer')!.setAttribute('src', data.url);
        this.idUser = data.idUser;
        this.checkAspectRatio();
      });
      if (this.token) {
        this.videoService.addToHistory(parseInt(id)).subscribe(() => {});
      }
    });
  }

  shareUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }

  checkAspectRatio() {
    const video = document.getElementById('videoplayer') as HTMLVideoElement;
    if (video.videoWidth / video.videoHeight > 1.5) {
      video.style.width = '425px';
    } else {
      video.style.height = '80%';
    }
  }
}
