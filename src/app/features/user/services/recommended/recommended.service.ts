import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHomePageData } from 'src/app/core/interfaces/IHomePageData';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecommendedService {
  private api = `${environment.apiUrl}/recommended`
  constructor(private _http:HttpClient) { }
  recomended(): Observable<IHomePageData> {
    return this._http.get<IHomePageData>(`${this.api}/recomended`)
  }

}
