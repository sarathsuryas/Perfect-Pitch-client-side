import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from 'src/app/store/search/search.selector';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { SharedService } from '../../services/shared/shared.service';


@Component({
  selector: 'app-music-playlist',
  templateUrl: './music-playlist.component.html',
  styleUrls: ['./music-playlist.component.css']
})
export class MusicPlaylistComponent implements OnInit {
  playlists: IUserPlaylists[] = []
  search: boolean = false
  filteredPlaylists: any[] = [];
  showPublic: boolean = true;
  @ViewChild('playlistHeader', { static: false }) headerElement!: ElementRef;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 8;
  toggleLoading = () => this.isLoading = !this.isLoading;
  userCurrentPage = 1
  query:string =''

  constructor(private _playlistService: PlaylistService, private _store: Store,private _sharedService:SharedService) { }

  ngOnInit(): void {    
    this.loadMore();
    this._sharedService.searchPlaylist$.subscribe({
      next: (value) => {
        if (value) {
          this.search = true
        }
        if (this.search) {
          this.query = value
          this._playlistService.searchPlaylists(value).subscribe((data) => {
            this.playlists = data
          })
        }  if (this.search && this.query==='') {
          this.search = false
          this.currentPage=1;
          this.loadMore();
        }
      }
    })
   
  }


  toggleFilter() {
    this.showPublic = !this.showPublic;
    if (!this.showPublic) {
      this.headerElement.nativeElement.textContent = "Your Playlists"
      this.userCurrentPage = 1
       this.loadPrivatePlaylist()
    } else {
      this.headerElement.nativeElement.textContent = "Playlists"
      this.currentPage = 1
       this.loadMore()
    }

  }

  loadMore() {
    this.toggleLoading();
    this._playlistService.getPlaylists(this.currentPage, this.itemsPerPage).subscribe({
      next: data => this.playlists = data
    })
  }

  loadPrivatePlaylist() {
    this.toggleLoading();
    this._playlistService.getAllPlaylistUser(this.userCurrentPage, this.itemsPerPage).subscribe({
      next: data => this.playlists = data
    })
  }


  appendData() {
    this.toggleLoading();
    this._playlistService.getPlaylists(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.playlists = [...this.playlists, ...response],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

  appendPrivatePlaylist() {
    this.toggleLoading();
    this._playlistService.getAllPlaylistUser(this.userCurrentPage, this.itemsPerPage).subscribe({
      next: response => this.playlists = [...this.playlists, ...response],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

  onScroll() {
    if (this.showPublic) {
      this.currentPage++;
      this.appendData();
    } else if (!this.showPublic) {
      this.userCurrentPage++
      this.appendPrivatePlaylist()
    }
  }




}
