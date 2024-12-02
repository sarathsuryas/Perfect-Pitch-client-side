import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { IAlbumResponse } from 'src/app/core/interfaces/IAlbumResponse';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
 private api = `${environment.apiUrl}/album`
  constructor(private _http:HttpClient) { }
  submitAlbumDetails(data: ISumbitAlbumDetails): Observable<{ uuid: string }> {
    const files = JSON.stringify(data)
    return this._http.post<{ uuid: string }>(`${this.api}/submit-album-details`, { files })
  }

  getAlbums(data: { query?: string, nextPage?: number } = { query: '', nextPage: 1 }): Observable<IAlbumData[]> {
    return this._http.get<IAlbumData[]>(`${this.api}/get-albums?album=${data.query}&page=${data.nextPage}&perPage=8`)
  } 
  
  getAlbumDetails(id: string): Observable<IAlbumResponse> {
    return this._http.get<IAlbumResponse>(`${this.api}/album-details?id=${id}`)
  }  

}
