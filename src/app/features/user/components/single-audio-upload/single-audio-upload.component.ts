import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { ISubmitSongDetailsDto } from 'src/app/core/dtos/ISubmitSongDetails.dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';
import { Router } from '@angular/router';
import { GenreService } from '../../services/genre/genre.service';
import { PresignedUrlService } from '../../services/presigned-url/presigned-url.service';
import { S3Service } from '../../services/S3/s3.service';
import { AlbumService } from '../../services/album/album.service';

@Component({
  selector: 'app-single-audio-upload',
  templateUrl: './single-audio-upload.component.html',
  styleUrls: ['./single-audio-upload.component.css']
})
export class SingleAudioUploadComponent implements OnInit {
  singleForm: FormGroup;
  trackPreviewUrl: string | null = null;
  thumbnailPreviewUrl: string | null = null;
  genres: IGenres[] = []
  detailsForSignedUrls: { name: string, type: string }[] = []
  presignedUrlsAndUniqueKey: { url: string, uniqueKey: string }[] = []
  uploadFilesArray: { url: string, contenttype: string, file: File }[] = []
  files: File[] = []
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private _userService: UserService,    private _spinner: NgxSpinnerService,private _router:Router,private _genreService:GenreService,
    private _presignedUrlService:PresignedUrlService,private _s3Service:S3Service,private _albumService:AlbumService
  ) {
    this.singleForm = this.fb.group({
      singleName: ['', Validators.required],
      genreId: ['', Validators.required],
      trackFile: [null, Validators.required],
      thumbnail: [null, Validators.required]
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

  onTrackFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.singleForm.patchValue({ trackFile: file });
      this.singleForm.get('trackFile')?.updateValueAndValidity();
      this.trackPreviewUrl = URL.createObjectURL(file);
    }
  }

  onThumbnailSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.singleForm.patchValue({ thumbnail: file });
      this.singleForm.get('thumbnail')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.thumbnailPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.singleForm.valid) {
      this._spinner.show()
      const name = this.singleForm.controls['singleName'].value
      const trackFile = this.singleForm.controls['trackFile'].value as File
      const thumbnail = this.singleForm.controls['thumbnail'].value as File
      const genreId = this.singleForm.controls['genreId'].value 
      this.files.push(trackFile)
      this.files.push(thumbnail)
      this.detailsForSignedUrls.push({ name: trackFile.name, type: trackFile.type })
      this.detailsForSignedUrls.push({ name: thumbnail.name, type: thumbnail.type })
      this._presignedUrlService.generatePreSignedUrls(this.detailsForSignedUrls).subscribe({
        next: (value) => {
          this.presignedUrlsAndUniqueKey = value.presignedUrls
          for (let i = 0; i < value.presignedUrls.length; i++) {
            this.uploadFilesArray.push({ url: this.presignedUrlsAndUniqueKey[i].url, contenttype: this.detailsForSignedUrls[i].type, file: this.files[i] })
          }
          this._s3Service.uploadMultipleFileToS3(this.uploadFilesArray).subscribe({
            next: (value) => {
              const array = []
               array.push({ title: name, uniqueKey:this.presignedUrlsAndUniqueKey[0].uniqueKey, thumbNailUniqueKey:  this.presignedUrlsAndUniqueKey[1].uniqueKey })
              if(value) {
                const obj:  ISumbitAlbumDetails = {
                  title: name,
                  genreId: genreId,
                  thumbnailKey: this.presignedUrlsAndUniqueKey[1].uniqueKey,
                  songs: array
                } 
                
              this._albumService.submitAlbumDetails(obj).subscribe({
                next:(value)=>{
                  this.singleForm.reset()
                  this._router.navigate([`/home/album-songs/${value.uuid}`])
                  this._spinner.hide()
                  this.snackBar.open('Single uploaded successfully!', 'Close', { duration: 3000 });
                },
                error:(err)=>{
                  console.error(err)
                }
              })
              }       
            }, 
            error:(err)=>{
              console.error(err)
            }
          })
        },
        error: (err) => {
          console.error(err)
        }
      })
      
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
    }
  }


}
