import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoComponent } from '../../components/video/video.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    VideoComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  videoService: VideoService = inject(VideoService);
  title: string = '';
  isLoading: boolean = false;

  list: [] = [];

  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(({ title }) => {
      this.title ? (this.title = title) : null;
      console.log(this.title);

      this.isLoading = true;
      this.videoService.getVideos(this.title).subscribe((data) => {
        this.list = [];
        this.list = data;
        this.isLoading = false;
      });
    });
  }

  goTo() {
    this._router.navigate(['/'], { queryParams: { title: this.title } });
  }
}
