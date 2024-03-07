import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { RouterModule } from '@angular/router';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  videoService: VideoService = inject(VideoService);

  list: any[] = [];

  ngOnInit() {
    this.videoService.getVideos().subscribe((data) => {
      this.list = data;
    });
  }
}
