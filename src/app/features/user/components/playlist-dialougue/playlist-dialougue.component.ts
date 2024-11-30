import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';
import { UserService } from '../../services/user/user.service';
import { ICreatePlaylistDto } from 'src/app/core/dtos/createPlaylist.dto';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Route, Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist/playlist.service';



@Component({
  selector: 'app-playlist-dialougue',
  templateUrl: './playlist-dialougue.component.html',
  styleUrls: ['./playlist-dialougue.component.css']
})
export class PlaylistDialogComponent {

selectedPlaylist:string = ''
playlists:IUserPlaylists[] = []
@ViewChild('playlistList') list!:ElementRef

  constructor(
    public dialogRef: MatDialogRef<PlaylistDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data:{thumbNailLink:string,songId:string},
    private _router:Router,
    private _playlistService:PlaylistService
  ) { }

  ngOnInit(): void {
    this._playlistService.getAllPlaylistUser().subscribe({
      next:(data)=>{
      this.playlists = data
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  onSave(): void {
    const selectedPlaylists = this.playlists
    
    this.dialogRef.close(this.list);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  createNewPlaylist(): void {
    this.dialogRef.close();
   
    const dRef = this.dialog.open(CreatePlaylistDialogComponent, {
      width: '350px'
    });
    dRef.afterClosed().subscribe({
      next:(value)=>{
       const obj:ICreatePlaylistDto = {
         songId: this.data.songId,
         title: value.title,
         visibility: value.visibility,
         thumbNailLink: this.data.thumbNailLink
       } 
       this._playlistService.createPlaylist(obj).subscribe({
        next:(data)=>{
          if(data.playlistId) {
            this._router.navigate([`home/view-playlist/${data.playlistId}`])
          }
        },
        error:(err)=>{
          console.error(err)
        }
       })
      }
    })

  }

}
