import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { io,Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment.prod';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICreateLiveStreamDto } from 'src/app/core/dtos/ICreateLiveStream.dto';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { LiveStreamingService } from '../../services/live-streaming/live-streaming.service';
import { GenreService } from '../../services/genre/genre.service';

@Component({
  selector: 'app-create-live',
  templateUrl: './create-live.component.html',
  styleUrls: ['./create-live.component.css']
})
export class CreateLiveComponent {
  streamForm: FormGroup;
  genres: IGenres[] = []

  thumbnailPreview: string | ArrayBuffer | null = null;
  file!:File
  constructor(
    public dialogRef: MatDialogRef<CreateLiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
   private _genreService:GenreService
  ) {
    this.streamForm = this.fb.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      thumbnail: [null],
      genreId:['',Validators.required]
    });
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
  }

  onFileSelected(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.[0] as File;
    if (this.file) {
      this.streamForm.patchValue({ thumbnail: this.file });
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onSubmit() {
    if (this.streamForm.valid) {
      const obj:ICreateLiveStreamDto = {
        title: this.streamForm.controls['title'].value,
        description: this.streamForm.controls['description'].value,
        thumbNail: this.file,
        genreId: this.streamForm.controls['genreId'].value
      }
      this.dialogRef.close(obj);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
  

