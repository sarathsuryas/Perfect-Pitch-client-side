import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IShortsResponse } from 'src/app/core/interfaces/IShortsResponse';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShortsService {
  private api = `${environment.apiUrl}/shorts`
  constructor(private _http:HttpClient) { }
  submitShortsDetails(data: { caption: string, description: string, uniqueKey: string }) {
    return this._http.post(`${this.api}/submit-shorts-details`, data)
  }

  getShorts(): Observable<IShortsResponse> {
    return this._http.get<IShortsResponse>(`${this.api}/get-shorts`)
  }
  
}
