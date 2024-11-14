import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlbumDetails } from 'src/app/core/dtos/ISubmitSongDetails.dto';


@Component({
  selector: 'app-multiple-audio-upload',
  templateUrl: './multiple-audio-upload.component.html',
  styleUrls: ['./multiple-audio-upload.component.css']
})

export class MultipleAudioUploadComponent implements OnInit {

  // thumbNail!: File;
  // filesArray: File[] = [];
  // albumForm!: FormGroup;
  // detailsForSignedUrls: { name: string, type: string }[] = [];
  // presignedUrlsAndUniqueKey: { url: string, uniqueKey: string }[] = []
  // songsDetails: { title: string, uniqueKey: string }[] = []
  // genres:IGenres[] = []
  // @ViewChild('myInput')
  // myInputVariable!: ElementRef;
  // @ViewChild('songs')
  // songs!:ElementRef
  // constructor(private _fb: FormBuilder,
  //    private _userServce: UserService,
  //    private _messageService:MessageService,
  //    private _spinner: NgxSpinnerService,
  //    private _router:Router
  //   ) { }

  // ngOnInit(): void {
  //   this.albumForm = this._fb.group({
  //     albumTitle: ['', Validators.required],
  //     genreId:['',Validators.required]
  //   })
  //   this._userServce.getGenres().subscribe({
  //     next:(value)=> {
  //        this.genres = value
  //     },
  //     error:(err)=>{
  //       console.error(err)
  //     }
  //   })
  // }
  // selectedThumbnail(event: Event): void {
  //   const FILE = event.target as HTMLInputElement;
  //   if (FILE.files) {
  //     this.thumbNail = FILE.files[0];
  //   }
  // }

  // selectedFiles(event: Event): void {
  //   const FILE = event.target as HTMLInputElement
  //   if (FILE.files) {
  //     for (let i = 0; i < FILE.files.length; i++) {
  //       this.filesArray.push(FILE.files[i])
  //       const name = FILE.files[i].name
  //       const type = FILE.files[i].type
  //       this.detailsForSignedUrls.push({ name: name, type: type })
  //     }

  //   }
  //   this.filesArray.push(this.thumbNail)
  //   this.detailsForSignedUrls.push({ name: this.thumbNail.name, type: this.thumbNail.type })
  // }

  // submit() {
  //   if (this.albumForm.valid) {
  //     this._spinner.show()
  //     this._userServce.generatePreSignedUrlsForAlbums(this.detailsForSignedUrls).subscribe(async (data) => {
  //       this.presignedUrlsAndUniqueKey = data.presignedUrls
  //       try {
  //         for (let i = 0; i < this.filesArray.length; i++) {
  //           const result = await this._userServce.audioUpload(this.presignedUrlsAndUniqueKey[i].url, this.filesArray[i].type, this.filesArray[i])
  //           console.log(result,"result")
  //         }
  //         for (let i = 0; i < this.detailsForSignedUrls.length; i++) {
  //           this.songsDetails.push({ title: this.detailsForSignedUrls[i].name, uniqueKey: this.presignedUrlsAndUniqueKey[i].uniqueKey })
  //         }

  //         const obj: ISumbitAlbumDetails = {
  //           title: this.albumForm.controls['albumTitle'].value,
  //           genreId:this.albumForm.controls['genreId'].value,
  //           thumbnailKey: this.presignedUrlsAndUniqueKey.pop()?.uniqueKey as string,
  //           songs: this.songsDetails
  //         }
  //         this._userServce.submitAlbumDetails(obj).subscribe({
  //          next:(value)=>{ this._messageService.add({ severity: 'success', summary: 'Success', detail: 'album uploaded' });
  //           this.myInputVariable.nativeElement.value = "";
  //           this.songs.nativeElement.value = "";
  //           this.albumForm.reset()
  //           this._router.navigate(['home/albums'])
  //           this._spinner.hide()
  //         },error:(err)=>{
  //           console.error(err)
  //           this._spinner.hide()
  //         }})

  //       } catch (error) {
  //         this._spinner.hide()
  //         console.error(error)
  //       }

  //     })
  //   }
  // }

  presignedUrlsAndUniqueKey: { url: string, uniqueKey: string }[] = []
  albumData!: IAlbumDetails
  detailsForPresignedUrls: { name: string, type: string, file: File }[] = []
  presignedUrls: { url: string, uniqueKey: string }[] = []
  albumForm: FormGroup;
  albumThumbnailPreview: string | null = null;
  genres: IGenres[] = []
  uploadFilesArray: { url: string, contenttype: string, file: File }[] = []
  albumThumbNailUniqueKey: string = ''

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private _userService: UserService,
    private _spinner: NgxSpinnerService,
    private _router: Router
  ) {
    this.albumForm = this.fb.group({
      albumName: ['', Validators.required],
      albumThumbnail: [null, Validators.required],
      genreId: ['', Validators.required],
      tracks: this.fb.array([])
    });
    this.addTrack(); // Add one track by default
  }


  ngOnInit(): void {
    this._userService.getGenres().subscribe({
      next: (value) => {
        this.genres = value
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  get tracks() {
    return this.albumForm.get('tracks') as FormArray;
  }


  addTrack() {
    const trackForm = this.fb.group({
      name: ['', Validators.required],
      song: [null, Validators.required],
      songThumbNail: [null]
    });
    this.tracks.push(trackForm);
  }

  removeTrack(index: number) {
    this.tracks.removeAt(index);
  }

  onAlbumThumbnailSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.albumForm.patchValue({ albumThumbnail: file });
      this.albumForm.get('albumThumbnail')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.albumThumbnailPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onTrackFileSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.tracks.at(index).patchValue({ song: file });
      this.tracks.at(index).get('song')?.updateValueAndValidity();
    }
  }

  onTrackThumbnailSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.tracks.at(index).patchValue({ songThumbNail: file });
      this.tracks.at(index).get('songThumbNail')?.updateValueAndValidity();
    }
  }

  getTrackPreviewUrl(index: number): string {
    const file = this.tracks.at(index).get('song')?.value;
    return file ? URL.createObjectURL(file) : '';
  }

  getTrackThumbnailPreview(index: number): string | null {
    const file = this.tracks.at(index).get('songThumbNail')?.value;
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }



  onSubmit() {
    if (this.albumForm.valid) {
      this._spinner.show()
      this.albumData = this.albumForm.value
      this.detailsForPresignedUrls.push({ name: this.albumData.albumName, type: this.albumData.albumThumbnail.type, file: this.albumData.albumThumbnail })
      for (const value of this.albumData.tracks) {
        this.detailsForPresignedUrls.push({ name: value.name, type: value.song.type, file: value.song })
      }
      for (const value of this.albumData.tracks) {
        this.detailsForPresignedUrls.push({ name: value.songThumbNail.name, type: value.songThumbNail.type, file: value.songThumbNail })
      }
      this._userService.generatePreSignedUrls(this.detailsForPresignedUrls).subscribe({
        next: (data) => {
          this.presignedUrls = data.presignedUrls
          for (let i = 0; i < this.presignedUrls.length; i++) {
            this.uploadFilesArray.push({ url: this.presignedUrls[i].url, contenttype: this.detailsForPresignedUrls[i].type, file: this.detailsForPresignedUrls[i].file })
          }
          this._userService.uploadMultipleFileToS3(this.uploadFilesArray).subscribe({
            next: (value) => {
              if (value) {
                this.albumThumbNailUniqueKey = this.presignedUrls.shift()?.uniqueKey as string
                const array = []
                let middle = this.presignedUrls.length / 2
                for (let i = 0; i < this.presignedUrls.length / 2; i++) {
                  array.push({ title: this.albumData.tracks[i].name, uniqueKey: this.presignedUrls[i].uniqueKey, thumbNailUniqueKey: this.presignedUrls[middle].uniqueKey })
                  middle++
                }
                const obj: ISumbitAlbumDetails = {
                  title: this.albumForm.controls['albumName'].value,
                  genreId: this.albumForm.controls['genreId'].value,
                  thumbnailKey: this.albumThumbNailUniqueKey,
                  songs: array
                }
                
                this._userService.submitAlbumDetails(obj).subscribe({
                  next: (value) => {
                    this._spinner.hide()
                    this.albumForm.reset()
                    this._router.navigate([`/home/album-songs/${value.uuid}`])
                    this.snackBar.open('Album uploaded successfully!', 'Close', { duration: 3000 });
                  },
                  error: (err) => {
                    console.error(err)
                  }
                })
              }
            },
            error: (err) => {
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
