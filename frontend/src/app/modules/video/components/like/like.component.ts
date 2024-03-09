import { Component, Input, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../../user/user.service';
import { UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    UpperCasePipe,
    RouterModule,
  ],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() id: number = 0;
  @Input() idUser: number = 0;
  videoService: VideoService = inject(VideoService);
  userService: UserService = inject(UserService);
  channel: string = '';
  totalLikes: number = 0;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  isSubscribed: boolean = false;

  private _snackBar: MatSnackBar = inject(MatSnackBar);

  ngOnInit() {
    this.videoService.getLikesCount(this.id).subscribe((data: any) => {
      this.totalLikes = data[1];
    });
    this.videoService.getLike(this.id).subscribe((data) => {
      this.isLiked = data;
    });
    this.getChannel();
    this.subscribeStatus();
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

  shareUrl() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    this.showSnackBar('URL copied to clipboard');
  }

  subscribe() {
    this.videoService.subscribe(this.idUser).subscribe(() => {
      this.isSubscribed = true;
    });
  }

  unsubscribe() {
    this.videoService.unsubscribe(this.idUser).subscribe(() => {
      this.isSubscribed = false;
    });
  }

  subscribeStatus() {
    this.videoService.getStatusSubscription(this.idUser).subscribe((data) => {
      this.isSubscribed = data;
    });
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  getChannel() {
    this.userService.getChannel(this.idUser).subscribe((data: any) => {
      this.channel = data.username;
    });
  }
}
