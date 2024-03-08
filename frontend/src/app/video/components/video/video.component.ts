import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [RouterModule, MatSnackBarModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
})
export class VideoComponent {
  @Input() id: number = 0;
  @Input() video: any;
  @Input() view!: string;
  @Output() videoEvent = new EventEmitter<string>();
  url!: string;
  noImageUrl = '../../../../assets/images/no-image.svg';

  private _snackBar: MatSnackBar = inject(MatSnackBar);

  videoService: VideoService = inject(VideoService);

  ngOnInit() {
    if (this.id > 0) {
      this.videoService.getOneVideo(this.id).subscribe((data) => {
        console.log(data);
        
        this.video = data;
        this.videoService.getThumbnail(this.id).subscribe((data) => {
          this.url = data.url;
        });
      });
    }

    this.videoService.getThumbnail(this.video.id).subscribe((data) => {
      this.url = data.url;
    });
  }

  delete() {
    this.videoService.delete(this.video.id).subscribe(() => {
      this.videoEvent.emit(this.video.id);
      this.showSnackBar('Video deleted');
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
