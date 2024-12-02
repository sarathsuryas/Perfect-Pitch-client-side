import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ISongData } from 'src/app/core/interfaces/ISongData';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private api = `${environment.apiUrl}/audio`
  constructor(private _http:HttpClient) { }
  getSong(songId: string): Observable<ISongData> {
    if (!localStorage.getItem('token')) {
      return throwError(() => new Error('User is not authenticated'));
    }
    return this._http.get<ISongData>(`${this.api}/get-song?songId=${songId}`);

  }


}
