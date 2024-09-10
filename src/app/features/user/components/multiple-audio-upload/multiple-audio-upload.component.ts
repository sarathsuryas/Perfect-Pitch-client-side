import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';

@Component({
  selector: 'app-multiple-audio-upload',
  templateUrl: './multiple-audio-upload.component.html',
  styleUrls: ['./multiple-audio-upload.component.css']
})


export class MultipleAudioUploadComponent implements OnInit {
  thumbNail!: File;
  filesArray: File[] = [];
  albumForm!: FormGroup;
  detailsForSignedUrls: { name: string, type: string }[] = [];
  presignedUrlsAndUniqueKey: { url: string, uniqueKey: string }[] = []
  songsDetails: { title: string, uniqueKey: string }[] = []
  constructor(private _fb: FormBuilder, private _userServce: UserService) { }

  ngOnInit(): void {
    this.albumForm = this._fb.group({
      albumTitle: ['', Validators.required]
    })
  }
  selectedThumbnail(event: Event): void {
    const FILE = event.target as HTMLInputElement;
    if (FILE.files) {
      this.thumbNail = FILE.files[0];
    }
  }

  selectedFiles(event: Event): void {
    const FILE = event.target as HTMLInputElement
    if (FILE.files) {
      for (let i = 0; i < FILE.files.length; i++) {
        this.filesArray.push(FILE.files[i])
        const name = FILE.files[i].name
        const type = FILE.files[i].type
        this.detailsForSignedUrls.push({ name: name, type: type })
      }

    }
    this.filesArray.push(this.thumbNail)
    this.detailsForSignedUrls.push({ name: this.thumbNail.name, type: this.thumbNail.type })
  }

  submit() {
    if (this.albumForm.valid) {
      this._userServce.generatePreSignedUrlsForAlbums(this.detailsForSignedUrls).subscribe(async (data) => {
        this.presignedUrlsAndUniqueKey = data.presignedUrls
        try {
          for (let i = 0; i < this.filesArray.length; i++) {
            const result = await this._userServce.audioUpload(this.presignedUrlsAndUniqueKey[i].url, this.filesArray[i].type, this.filesArray[i])
            console.log(result,"result")
          }
          for (let i = 0; i < this.detailsForSignedUrls.length; i++) {
            this.songsDetails.push({ title: this.detailsForSignedUrls[i].name, uniqueKey: this.presignedUrlsAndUniqueKey[i].uniqueKey })
          }

          const obj: ISumbitAlbumDetails = {
            title: this.albumForm.controls['albumTitle'].value,
            thumbnailKey: this.presignedUrlsAndUniqueKey.pop()?.uniqueKey as string,
            songs: this.songsDetails
          }
          this._userServce.submitAlbumDetails(obj).subscribe()

        } catch (error) {
          console.error(error)
        }

      })
    }
  }
}
