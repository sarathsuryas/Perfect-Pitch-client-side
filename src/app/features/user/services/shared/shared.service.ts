import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, forkJoin, Subject, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() {
    
   }
  private playerIsActive = new Subject<boolean>()
  private albumSong = new Subject<{ albumId?: string, songId: string, artistName?: string, album: boolean, isGenre: boolean }>()
  private playlistSong = new Subject<{ playlistId?: string, songId: string, artistName?: string, songs: string[], album: boolean ,isGenre:boolean }>()
  private genreSong = new Subject<{ genreId?: string, songId: string, album: boolean, genre: boolean }>()
  private searchAlbum = new Subject<string>() 
  private searchVideo = new Subject<string>() 
  private searchPlaylist = new Subject<string>() 
  private searchArtist = new Subject<string>() 

  data$ = this.playerIsActive.asObservable()
  albumSong$ = this.albumSong.asObservable()
  playlistSong$ = this.playlistSong.asObservable()
  genreSong$ = this.genreSong.asObservable()
  searchArtist$ = this.searchArtist.asObservable()
  searchAlbum$ = this.searchAlbum.asObservable()
  searchVideo$ = this.searchVideo.asObservable()
  searchPlaylist$ = this.searchPlaylist.asObservable()
  
  changePlayerState(status: boolean) {
    this.playerIsActive.next(status)
  }


  playAlbumSong(data: { albumId?: string, songId: string, artistName?: string, album: boolean, isGenre: boolean }) {
    this.albumSong.next(data)
  }

  playPlaylistSong(data: { playlistId?: string, songId: string, artistName?: string, songs: string[], album: boolean,isGenre:boolean }) {
    this.playlistSong.next(data)
  }

  playGenreSong(data: { genreId?: string, songId: string, album: boolean, genre: boolean }) {
    this.genreSong.next(data)
  }
searchAl(query:string) {
  this.searchAlbum.next(query)
}
searchV(query:string) {
 this.searchVideo.next(query)
}
searchP(query:string) {
this.searchPlaylist.next(query)
}
searchAr(query:string) {
  this.searchArtist.next(query)
}

}
