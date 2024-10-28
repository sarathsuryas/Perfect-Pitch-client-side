import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUploadShortsDto } from 'src/app/core/dtos/uploadShorts.dto';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shorts-upload',
  templateUrl: './shorts-upload.component.html',
  styleUrls: ['./shorts-upload.component.css']
})
export class ShortsUploadComponent {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  caption: string = '';
  description: string = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  start: string = ''
  end: string = ''
  url: string = ''
  uniqueKey: string = ''
  uploadProgress: number = 0
  constructor(private _userService: UserService, private readonly _messageService: MessageService) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewUrl = URL.createObjectURL(this.selectedFile);
      setTimeout(() => {
        if (this.videoPlayer) {
          this.videoPlayer.nativeElement.load();
        }
      }, 0);
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  getLength(event: { start: string, end: string }) {
    this.start = event.start
    this.end = event.end
  }

  async uploadShort() {
    if (!this.selectedFile) {
      alert('Please select a video file');
      return;
    }

    if (!this.caption.trim()) {
      alert('Please enter a caption');
      return;
    }
    const data = await this._userService.generatePresignedUrlMedia(this.caption, this.selectedFile.type) as ICustomResponse
    this.url = data.presignedUrl.url
    this.uniqueKey = data.presignedUrl.uniqueKey
    this._userService.shortsUpload(this.url, this.selectedFile.type, this.selectedFile)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round((100 * event.loaded) / event.total);
            } else {
              // Handle the case where total is undefined, e.g., set a fallback value
              this.uploadProgress = Math.round(100 * event.loaded / (event.loaded || 1));
            }
            break;
          case HttpEventType.Response:
            // Handle the response once the upload is complete
            console.log('Upload complete!', event.body);
            this._messageService.add({ severity: 'success', summary: 'success', detail: "shorts uploaded" })
            this.uploadProgress = 100;
            this._userService.submitShortsDetails({ caption: this.caption, description: this.description, uniqueKey: this.uniqueKey }).subscribe({
              next: (data) => {
                alert("success")
                this.selectedFile = null;
                this.previewUrl = null;
                this.caption = '';
                this.description = '';
                if (this.fileInput) {
                  this.fileInput.nativeElement.value = '';
                }
              },
              error: (err) => {
                console.error(err)
              }
            })
            break;
          default:
            break;
        }
      }, error => {
        console.error('Upload error:', error);
        this.uploadProgress = 0;  
      });

  }
}
