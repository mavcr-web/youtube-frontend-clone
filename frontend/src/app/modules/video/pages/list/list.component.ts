import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoComponent } from '../../components/video/video.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../../services/role.service';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  videoService: VideoService = inject(VideoService);
  roleService: RoleService = inject(RoleService);
  isLoading: boolean = false;

  list: [] = [];

  role$ = this.roleService.role$;

  _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  _router: Router = inject(Router);

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(({ title }) => {
      this.isLoading = true;
      title == undefined ? (title = '') : (title = title);
      this.videoService.getVideos(title).subscribe((data) => {
        this.list = [];
        this.list = data;
        this.isLoading = false;
      });
    });
  }
}
