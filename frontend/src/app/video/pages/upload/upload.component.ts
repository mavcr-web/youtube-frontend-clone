import { Component, inject } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  videoService: VideoService = inject(VideoService);
  video!: File | undefined;
  url!: string | undefined;
  urlThumbnail!: string | undefined;
  thumbnail!: File | undefined;

  private formBuilder: FormBuilder = inject(FormBuilder);
  uploadForm!: FormGroup;
  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getFiles(event: Event): File[] {
    const files = (event.target as HTMLInputElement).files;
    return files ? Array.from(files) : [];
  }

  loadVideo(event: Event): void {
    const file = this.getFiles(event)[0];
    if (file) {
      this.video = file;
      this.url = URL.createObjectURL(this.video);
    }
    this.uploadForm.get('name')?.setValue(file.name.split('.')[0]);
    this.uploadForm.get('description')?.setValue(file.name.split('.')[0]);
  }

  uploadVideo(visibility: string): void {
    if (!this.video || !this.thumbnail) {
      return;
    }
    this.videoService
      .uploadVideo(this.video, this.thumbnail, visibility)
      .subscribe((data) => {
        this._snackBar.open('Video uploaded', 'Close', {
          duration: 3000,
        });
        this.reset();
      });
  }

  generateThumbnail(width: number, height: number): void {
    const video = document.getElementById('video') as HTMLVideoElement;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = width;
    canvas.height = height;

    const aspectRatio = this.checkAspectRatio();

    if (aspectRatio === 'width') {
      const scale = width / video.videoWidth;
      canvas.height = video.videoHeight * scale;
    }

    if (aspectRatio === 'height') {
      const scale = height / video.videoHeight;
      canvas.width = video.videoWidth * scale;
    }

    // Dibuja el fotograma actual del video en el canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Obtén la imagen en formato base64 desde el canvas
    this.urlThumbnail = canvas.toDataURL('image/jpeg');

    this.thumbnail = this.base64ToFile(
      this.urlThumbnail,
      'thumbnail.jpeg',
      'image/jpeg'
    );
  }

  base64ToFile(base64String: string, fileName: string, mimeType: string): File {
    // Decodificar la cadena base64
    const byteString = atob(base64String.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // Crear un blob a partir de la cadena decodificada
    const blob = new Blob([ab], { type: mimeType });

    // Crear un nuevo archivo File a partir del blob
    const file = new File([blob], fileName, { type: mimeType });

    return file;
  }

  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  reset(): void {
    this.url = undefined;
    this.urlThumbnail = undefined;
    this.video = undefined;
    this.thumbnail = undefined;

    const input = document.getElementById('input') as HTMLInputElement;

    input.value = '';

    this.uploadForm.reset();
  }

  openInput(): void {
    const input = document.getElementById('input') as HTMLInputElement;
    input.click();
  }

  checkAspectRatio(): string {
    const video = document.getElementById('video') as HTMLVideoElement;
    if (video.videoWidth / video.videoHeight > 1.5) {
      return 'width';
    } else {
      return 'height';
    }
  }
}
