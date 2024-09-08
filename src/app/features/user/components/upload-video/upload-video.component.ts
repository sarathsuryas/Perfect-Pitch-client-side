import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  video: File | null = null; // Variable to store file
  url: string | ArrayBuffer | null | undefined
  videoData!: File;
  videoName!: string;
  thumbNailData!: File
  presignedUrlVideo!: string
  presignedUrlThumbNail!: string
  uniqueKeyVideo!: string;
  uniqueKeyThumbNail!: string;

  constructor(public dialogRef: MatDialogRef<UploadVideoComponent>, private _formBuilder: FormBuilder, private _userService: UserService) { }
  videoFile(event: Event) {
    const FILE = event.target as HTMLInputElement
    if (FILE.files && FILE.files[0]) {
      this.videoData = FILE.files[0];
      this.videoName = this.videoData.name
    }
  }

  thumbNail(event: Event) {
    const FILE = event.target as HTMLInputElement
    if (FILE.files && FILE.files[0]) {
      this.thumbNailData = FILE.files[0];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['',],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',],
  });
  thirdFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    genre: ['', Validators.required]
  })

  isLinear = true;
  submit() {
    this._userService.generatePresignedUrlVideo(this.videoData.name, this.videoData.type)
      .subscribe((result) => {
        if (result.success) {
          this.presignedUrlVideo = result.presignedUrl.url
          this.uniqueKeyVideo = result.presignedUrl.uniqueKey
          this._userService.generatePresignedUrlVideoThumbNail(this.thumbNailData.name, this.thumbNailData.type).subscribe((result) => {
            if (result.success) {
              this.presignedUrlThumbNail = result.presignedUrl.url
              this.uniqueKeyThumbNail = result.presignedUrl.uniqueKey
              this._userService.videoUpload(this.presignedUrlVideo, this.videoData.name, this.videoData).subscribe((result) => {
                if (result) {
                 
                  this._userService.videoThumbNailUpload(this.presignedUrlThumbNail, this.thumbNailData.name, this.thumbNailData).subscribe((result) => {
                    if (result) {
                      const title = this.thirdFormGroup.controls['title'].value as string
                      const genre = this.thirdFormGroup.controls['genre'].value as string
                      const description = this.thirdFormGroup.controls['description'].value as string

                      this._userService.submitVideoDetails({ videoName: title, genre: genre, thumbNailName: this.thumbNailData.name, videoDescription: description, uniqueKeyThumbNail: this.uniqueKeyThumbNail, uniqueKeyVideo: this.uniqueKeyVideo }).subscribe((finalResult) => {
                        if (finalResult) {
                          alert("final success")
                        }
                      },
                        (error) => {
                          console.error('final Errror', error)
                        }
                      )
                    }
                  },
                    (error) => {
                      console.log("fourth error", error)
                    }
                  )
                }
              },
                (error) => {
                  console.log("third Error", error)
                }
              )
            }
          },
            (error) => {
              console.error("second error", error)
              alert(error.message)
            }
          )
        }
      },
        (error) => {
          console.error("first error", error)
          alert(error.message)
        }
      )
  }
}
