import { Component, HostListener, inject } from '@angular/core';
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
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset;

    // Si el usuario ha llegado al final de la página
    if (windowHeight + scrollTop >= documentHeight) {
      // Aquí puedes cargar más elementos
      alert('Cargar más elementos');
    }
  }
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
