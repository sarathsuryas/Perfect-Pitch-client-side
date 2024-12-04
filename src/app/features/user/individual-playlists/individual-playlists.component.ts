import { Component } from '@angular/core';
import { PlaylistService } from '../services/playlist/playlist.service';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-playlists',
  templateUrl: './individual-playlists.component.html',
  styleUrls: ['./individual-playlists.component.css']
})
export class IndividualPlaylistsComponent {
  playlists: IUserPlaylists[] = []
  search: boolean = false
  filteredPlaylists: any[] = [];
  showPublic: boolean = true;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 8;
  toggleLoading = () => this.isLoading = !this.isLoading;
  userCurrentPage = 1
  query:string =''
 artistId:string =  ''
  constructor(private _playlistService: PlaylistService,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {    
    this.artistId = this._activatedRoute.snapshot.params['id'];
    this.loadMore();   
  }

  loadMore() {
    this.toggleLoading();
    this._playlistService.getIndividualPlaylists(this.currentPage, this.itemsPerPage,this.artistId).subscribe({
      next: data => this.playlists = data
    })
  }

 


  appendData() {
    this.toggleLoading();
    this._playlistService.getIndividualPlaylists(this.currentPage, this.itemsPerPage,this.artistId).subscribe({
      next: response => this.playlists = [...this.playlists, ...response],
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

 
  onScroll() {
    
      this.currentPage++;
      this.appendData();
    
  }





}
