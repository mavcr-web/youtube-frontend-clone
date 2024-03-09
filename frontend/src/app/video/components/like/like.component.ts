import { Component, Input, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { VideosComponent } from '../../pages/videos/videos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() id: number = 0;
  videoService: VideoService = inject(VideoService);
  totalLikes: number = 0;
  isLiked: boolean = false;
  isDisliked: boolean = false;

  ngOnInit() {
    this.videoService.getLikesCount(this.id).subscribe((data: any) => {
      this.totalLikes = data[1];
    });
    this.videoService.getLike(this.id).subscribe((data) => {
      this.isLiked = data;
    });
  }

  removeLike() {
    this.videoService.removeLike(this.id).subscribe(() => {
      this.isLiked = false;
      this.totalLikes--;
    });
  }

  addLike() {
    this.videoService.addLike(this.id).subscribe(() => {
      this.isLiked = true;
      this.totalLikes++;
    });
  }
}
