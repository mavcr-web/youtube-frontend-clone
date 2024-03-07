import { Component, Input, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  @Input() video: any;
  @Input() view!: string;
  url!: string;

  videoService: VideoService = inject(VideoService);

  ngOnInit() {
    this.videoService.getThumbnail(this.video.id).subscribe((data) => {
      this.url = data.url;
    });
  }
}
