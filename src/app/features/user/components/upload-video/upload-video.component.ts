import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { GenreService } from '../../services/genre/genre.service';
import { PresignedUrlService } from '../../services/presigned-url/presigned-url.service';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

  video: File | null = null;
  url: string | ArrayBuffer | null | undefined
  videoData!: File;
  thumbNailData!: File
  presignedUrlVideo!: string
  presignedUrlThumbNail!: string
  uniqueKeyVideo!: string;
  uniqueKeyThumbNail!: string;

  uploadForm!: FormGroup;
  videoPreviewUrl: string | null = null;
  thumbnailPreviewUrl: string | null = null;
  genres: IGenres[] = []

  constructor(private _fb: FormBuilder,
    private _userService: UserService,
    private _spinner: NgxSpinnerService,
    private _messageService: MessageService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _genreService:GenreService,
    private _presignedUrlService:PresignedUrlService,
    private _videoService:VideoService
  ) {

  }


  ngOnInit(): void {
    this._genreService.getGenres().subscribe({
      next: (value) => {
        this.genres = value
      },
      error: (err) => {
        console.error(err)
      }
    })
    this.uploadForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genreId: ['', Validators.required],
    });
  }


  onVideoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.videoData = file
      this.videoPreviewUrl = URL.createObjectURL(file);
    }
  }

  onThumbnailSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.thumbNailData = file
      this.thumbnailPreviewUrl = URL.createObjectURL(file);
    }
  }



  async submit() {
    try {
      if (this.uploadForm.valid && this.videoData && this.thumbNailData) {
        this._spinner.show()
        const videoData = await this._presignedUrlService.generatePresignedUrlMedia(this.videoData.name, this.videoData.type) as ICustomResponse
        this.presignedUrlVideo = videoData.presignedUrl.url
        this.uniqueKeyVideo = videoData.presignedUrl.uniqueKey
        const thumbNailData = await this._userService.generatePresignedUrlMediaThumbNail(this.thumbNailData.name, this.thumbNailData.type) as ICustomResponse
        this.presignedUrlThumbNail = thumbNailData.presignedUrl.url
        this.uniqueKeyThumbNail = thumbNailData.presignedUrl.uniqueKey
        const data = await this._userService.mediaUpload(this.presignedUrlVideo, this.videoData.type, this.videoData)
        console.log(data, "data")
        const result = await this._userService.mediaThumbNailUpload(this.presignedUrlThumbNail, this.thumbNailData.type, this.thumbNailData)
        console.log(result, "result")
        const title = this.uploadForm.controls['title'].value as string
        const genreId = this.uploadForm.controls['genreId'].value as string
        const description = this.uploadForm.controls['description'].value as string

        this._videoService.submitVideoDetails({ videoName: title, genreId: genreId, thumbNailName: this.thumbNailData.name, videoDescription: description, uniqueKeyThumbNail: this.uniqueKeyThumbNail, uniqueKeyVideo: this.uniqueKeyVideo, shorts: false }).subscribe((data) => {
          if (data) {
            this._spinner.hide()
            this._messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Video uploaded successfully',
            });
            this._router.navigate([`/home/play-video/${data.videoId}`])
          }
        },
          (error) => {
            console.error(error)
          }
        )
      }

    } catch (error) {
      console.error(error)
    }

  }



  onSubmit(): void {
    if (this.uploadForm.valid && this.videoPreviewUrl && this.thumbnailPreviewUrl) {
      // Here you would typically send the form data and files to your server
      console.log('Form data:', this.uploadForm.value);
      console.log('Video file:', this.videoPreviewUrl);
      console.log('Thumbnail file:', this.thumbnailPreviewUrl);

      this._snackBar.open('Video uploaded successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }

}
