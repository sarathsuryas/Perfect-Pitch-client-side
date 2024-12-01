import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { IPreSignedUrls } from 'src/app/core/interfaces/IPresignedUrls';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PresignedUrlService {
  private api = `${environment.apiUrl}/presigned-url`
  constructor(private _http:HttpClient) { }
  getPresignedUrl(fileName: string, contentType: string,): Observable<ICustomResponse> {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType })
  }
  generatePreSignedUrls(detailsForSignedUrls: { name: string, type: string }[]): Observable<IPreSignedUrls> {
    const post_params = JSON.stringify(detailsForSignedUrls)
    return this._http.post<IPreSignedUrls>(`${this.api}/generate-pre-signed-urls`, { post_params })
  }
  generatePresignedUrlMedia(fileName: string, contentType: string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType }).toPromise()
  }
  generatePresignedUrlMediaThumbNail(fileName: string, contentType: string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType }).toPromise()
  }

}
