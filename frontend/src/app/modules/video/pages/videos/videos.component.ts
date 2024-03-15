import { Component, HostListener, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { VideoComponent } from '../../components/video/video.component';
import { RoleService } from '../../../../services/role.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [VideoComponent, AsyncPipe],
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
  roleService: RoleService = inject(RoleService);
  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  role$ = this.roleService.role$;

  list: any[] = [];

  id: number = 0;

  ngOnInit() {
    this._activatedRoute.params.subscribe(({ id }) => {
      if (id == undefined) {
        this.id = 0;
        this.videoService.getMyVideos().subscribe((data) => {
          this.list = data;
        });
      }

      if (id) {
        this.id = parseInt(id);
        this.videoService.getChannelVideos(id).subscribe((data) => {
          this.list = data;
        });
      }
    });
  }

  removeFromlist(id: string) {
    this.list = this.list.filter((v) => v.id !== id);
  }
}
