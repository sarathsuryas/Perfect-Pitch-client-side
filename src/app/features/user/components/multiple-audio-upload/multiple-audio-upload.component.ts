import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-multiple-audio-upload',
  templateUrl: './multiple-audio-upload.component.html',
  styleUrls: ['./multiple-audio-upload.component.css']
})
export class MultipleAudioUploadComponent implements OnInit {
  thumbNail!: File;
  filesArray: File[] = [];
  albumForm!: FormGroup;
  songsDetails: { name: string, type: string }[] = [];
  constructor(private _fb: FormBuilder,private _userServce:UserService) { }

  ngOnInit(): void {
    this.albumForm = this._fb.group({
      albumTitle: ['', Validators.required]
    })
  }
  selectedThumbnail(event: Event):void {
    const FILE = event.target as HTMLInputElement;
    if (FILE.files) {
      this.thumbNail = FILE.files[0];
    }
  }

  selectedFiles(event: Event):void {
    const FILE = event.target as HTMLInputElement
    if (FILE.files) {
      for (let i = 0; i < FILE.files.length; i++) {
        this.filesArray.push(FILE.files[i])
        this.songsDetails.push({ name: FILE.files[i].name, type: FILE.files[i].type })
      } 
    }
    console.log(this.songsDetails)
  }

  submit() {
    if (this.albumForm.valid) {

    }
  }
}
