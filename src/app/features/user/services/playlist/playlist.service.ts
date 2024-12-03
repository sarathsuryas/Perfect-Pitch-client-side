import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,delay } from 'rxjs';
import { ICreatePlaylistDto } from 'src/app/core/dtos/createPlaylist.dto';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private api = `${environment.apiUrl}/playlist`
  constructor(private _http:HttpClient) { }
  createPlaylist(data: ICreatePlaylistDto): Observable<{ playlistId: string }> {
    console.log(data)
    return this._http.post<{ playlistId: string }>(`${this.api}/create-Playlist`, data)
  }
  getUserPlaylists(data: { query?: string, nextPage?: number } = { query: '', nextPage: 1 }): Observable<IUserPlaylists[]> {
    return this._http.get<IUserPlaylists[]>(`${this.api}/get-user-playlists?playlist=${data.query}&page=${data.nextPage}&perPage=6`)
  }

  getAllPlaylistUser(page=1,itemsPerPage=8,query=''): Observable<IUserPlaylists[]> {
    return this._http.get<IUserPlaylists[]>(`${this.api}/get-all-playlists-user?playlist=${query}&page=${page}&perPage=${itemsPerPage}`)
  }  



  getPlaylists(page=1,itemsPerPage=8,query=''): Observable<IUserPlaylists[]> {
    return this._http.get<IUserPlaylists[]>(`${this.api}/get-playlists?playlist=${query}&page=${page}&perPage=${itemsPerPage}`).pipe(delay(500)) 
  }

  addToPlaylsit(songId: string, playlistId: string): Observable<{ success: boolean, exist: boolean }> {
    return this._http.put<{ success: boolean, exist: boolean }>(`${this.api}/add-to-playlist`, { songId, playlistId })
  }  
  getPlaylistSongs(playlistId: string): Observable<IUserPlaylists> {
    return this._http.get<IUserPlaylists>(`${this.api}/get-playlist-songs?playlistId=${playlistId}`)
  }

  
}
