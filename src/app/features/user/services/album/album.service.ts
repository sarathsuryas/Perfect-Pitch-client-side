import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { IAlbumResponse } from 'src/app/core/interfaces/IAlbumResponse';
import { environment } from 'src/environment/environment.prod';
import { delay } from 'rxjs';

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
  searchAlbums(query:string) {
    return this._http.get<IAlbumData[]>(`${this.api}/search-albums?album=${query}`) 
 }

  getAlbums(page=1,itemsPerPage=8) {
    return this._http.get<IAlbumData[]>(`${this.api}/get-albums?page=${page}&perPage=${itemsPerPage}`).pipe(delay(500)) 
 }
 
  
  getAlbumDetails(id: string): Observable<IAlbumResponse> {
    return this._http.get<IAlbumResponse>(`${this.api}/album-details?id=${id}`)
  }  

}
