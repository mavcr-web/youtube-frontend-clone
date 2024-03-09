import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { VideoComponent } from '../../components/video/video.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [VideoComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  videoService: VideoService = inject(VideoService);

  list: any[] = [];

  ngOnInit() {
    this.videoService.getHistory().subscribe((data) => {
      this.list = data;
    });
  }
}
