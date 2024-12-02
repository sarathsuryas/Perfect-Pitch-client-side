import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { ISongsSameGenre } from 'src/app/core/interfaces/ISongsSameGenre';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private api = `${environment.apiUrl}/genre`
  constructor(private _http:HttpClient) { }
  getGenres(): Observable<IGenres[]> {
    return this._http.get<IGenres[]>(`${this.api}/get-genres`)
  }
  getSameGenreSongs(genreId: string): Observable<ISongsSameGenre[]> {
    return this._http.get<ISongsSameGenre[]>(`${this.api}/get-genre-songs?genreId=${genreId}`)
  }




}
