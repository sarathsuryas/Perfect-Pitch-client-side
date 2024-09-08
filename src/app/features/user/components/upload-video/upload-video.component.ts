import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  video: File | null = null; // Variable to store file
  url: string | ArrayBuffer | null | undefined
  videoData!: File;
  videoName!:string;
  thumbNailData!:File

constructor(public dialogRef: MatDialogRef<UploadVideoComponent>,private _formBuilder: FormBuilder) {}
videoFile(event:Event) {
  const FILE = event.target as HTMLInputElement
  if (FILE.files && FILE.files[0]) {
    this.videoData = FILE.files[0];
    this.videoName = this.videoData.name
  }
}

thumbNail(event:Event) {
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
    title:['',Validators.required],
    description:['',Validators.required]
  })

  isLinear = true;

}
