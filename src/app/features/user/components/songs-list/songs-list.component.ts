import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ISongsSameGenre } from 'src/app/core/interfaces/ISongsSameGenre';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent {

id:string = ''  
songs:ISongsSameGenre[] = [];

currentlyPlayingId: string | null = null;
constructor(private _userService:UserService,private _route:ActivatedRoute) {
  const audio = new Audio("https://perfect-pitch-user-profile.s3.ap-south-1.amazonaws.com/_id66ae13e5ace1f5eac8de2306Billie_Jean_7CTJcHjkq0E_140.mp3");
audio.addEventListener('loadedmetadata',()=>{
  const duration = audio.duration
  console.log("duration",this.formatDuration(duration))
})
}
  
ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id') as string
    this._userService.getSameGenreSongs(this.id).subscribe({
      next:(value)=>{
      this.songs = value
      console.log(value)
      },
      error:(err)=>{
         console.error(err)
      }
    })
  }

  playSong(song: any): void {
    
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

}
