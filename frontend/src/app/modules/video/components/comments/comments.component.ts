import { Component, Input, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { VideoService } from '../../services/video.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  @Input() id: number = 0;

  list: any[] = [];
  comment: string = '';

  videoService: VideoService = inject(VideoService);

  ngOnInit() {
    this.videoService.getComments(this.id).subscribe((data) => {
      this.list = data;
    });
  }

  addComment() {
    this.videoService.addComment(this.id, this.comment).subscribe((data) => {
      this.list.push(data);
      this.comment = '';
    });
  }

  removeComment(id: number) {
    this.videoService.removeComment(id).subscribe(() => {
      this.list = this.list.filter((item) => item.id !== id);
    });
  }
}
