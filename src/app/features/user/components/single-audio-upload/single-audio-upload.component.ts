import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';

@Component({
  selector: 'app-single-audio-upload',
  templateUrl: './single-audio-upload.component.html',
  styleUrls: ['./single-audio-upload.component.css']
})
export class SingleAudioUploadComponent implements OnInit {
  songForm!: FormGroup
  songData!: File
  thumbNailData!:File
  constructor(private _userService: UserService, private _fb: FormBuilder) { }
  ngOnInit(): void {
    this.songForm = this._fb.group({
      title: ['', Validators.required],
      genre:['',Validators.required]
    })
  }

  onselectedThumbnail(event: Event) {
    const FILE = event.target as HTMLInputElement;
    if (FILE.files) {
      this.thumbNailData = FILE.files[0]
    }
  }

  onSelectedFile(event: Event) {
    const FILE = event.target as HTMLInputElement;
    if (FILE.files) {
      this.songData = FILE.files[0]
    }
  }

  async submit() {
    if (this.songForm.valid) {
      const title = this.songForm.controls['title'].value
      const genre = this.songForm.controls['genre'].value
      const songUrlData = await this._userService.generatePresignedUrlMedia(title, this.songData.type) as ICustomResponse
      const thumbNailUrlData = await this._userService.generatePresignedUrlMediaThumbNail(this.thumbNailData.name,this.thumbNailData.type) as ICustomResponse
      const responseAudio = await this._userService.mediaUpload(songUrlData.presignedUrl.url,this.songData.type,this.songData)
      console.log(responseAudio)
      const responseThumbNail = await this._userService.mediaThumbNailUpload(thumbNailUrlData.presignedUrl.url,this.thumbNailData.type,this.thumbNailData)
      console.log(responseThumbNail)
      this._userService.submitSongDetails({title:title,genre:genre,songUniqueKey:songUrlData.presignedUrl.uniqueKey,thumbNailUniqueKey:thumbNailUrlData.presignedUrl.uniqueKey}).subscribe((data)=>{
        console.log(data)
        alert("uploaded")
      })

    }
  }


}
