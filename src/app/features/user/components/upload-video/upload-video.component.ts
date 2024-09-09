import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit{

  video: File | null = null; // Variable to store file
  url: string | ArrayBuffer | null | undefined
  videoData!: File;
  videoName!: string;
  thumbNailData!: File
  presignedUrlVideo!: string
  presignedUrlThumbNail!: string
  uniqueKeyVideo!: string;
  uniqueKeyThumbNail!: string;
  thirdFormGroup!:FormGroup 

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
  isLinear = true;
  onNoClick(): void {
    this.dialogRef.close();
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['',],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['',],
  });
 
  ngOnInit(): void {
     this.thirdFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required]
    })
  }


  
  async submit() {
    try {
    if(this.thirdFormGroup.valid) {
      this.dialogRef.close();
      const videoData = await this._userService.generatePresignedUrlVideo(this.videoData.name, this.videoData.type) as ICustomResponse
      this.presignedUrlVideo = videoData.presignedUrl.url
      this.uniqueKeyVideo = videoData.presignedUrl.uniqueKey
      const thumbNailData = await this._userService.generatePresignedUrlVideoThumbNail(this.thumbNailData.name, this.thumbNailData.type) as ICustomResponse
      this.presignedUrlThumbNail = thumbNailData.presignedUrl.url
      this.uniqueKeyThumbNail = thumbNailData.presignedUrl.uniqueKey
      const data = await this._userService.videoUpload(this.presignedUrlVideo, this.videoData.type, this.videoData)
      console.log(data,"data")
      const result = await this._userService.videoThumbNailUpload(this.presignedUrlThumbNail, this.thumbNailData.type, this.thumbNailData)
      console.log(result,"result")
      const title = this.thirdFormGroup.controls['title'].value as string
      const genre = this.thirdFormGroup.controls['genre'].value as string
      const description = this.thirdFormGroup.controls['description'].value as string

      this._userService.submitVideoDetails({ videoName: title, genre: genre, thumbNailName: this.thumbNailData.name, videoDescription: description, uniqueKeyThumbNail: this.uniqueKeyThumbNail, uniqueKeyVideo: this.uniqueKeyVideo }).subscribe((data) => {
        if (data) {
          alert("success")
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
}
