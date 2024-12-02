import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { userModel } from '../../../../store/user/user.model';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { CookieService } from 'ngx-cookie';
import { environment } from 'src/environment/environment.prod';
import { ITokenData } from 'src/app/core/interfaces/ITokenData';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { IReturnEdit } from 'src/app/core/interfaces/IReturnEdit';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/user/user.action';
import { IVideoUploadDto } from 'src/app/core/dtos/IVideoUpload.dto';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IResponseVideo } from 'src/app/core/interfaces/IResponseVideo';
import { IUploadShortsDto } from 'src/app/core/dtos/uploadShorts.dto';
import { IShortsUploadResponse } from 'src/app/core/interfaces/IShortsUploadResponse';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { IUserMedia } from 'src/app/core/interfaces/IUserMedia';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = `${environment.apiUrl}/user`
  constructor(private readonly _http: HttpClient, private readonly _cookieService: CookieService, private _router: Router, private readonly _store: Store) { }

  userData(): Observable<IUserData> {
    return this._http.get<IUserData>(`${this.api}/get-user-data`)
  }

  

  profileImageUpload(fileuploadurl: string, contenttype: string, file: File): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
      });
    return this._http.request(req);
  }

  submitProfileImageDetails(uniqueKey: string) {
    return this._http.put(`${this.api}/submit-profile-image-details`, { uniqueKey })
  }



  mediaUpload(fileuploadurl: string, contenttype: string, file: File) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
      });
    return this._http.request(req).toPromise();
  }


  mediaThumbNailUpload(fileuploadurl: string, contenttype: string, file: File) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
      });
    return this._http.request(req).toPromise();
  }



  editProfile(data: EditUserDto) {
    this._http.put<IReturnEdit>(`${this.api}/edit-profile`, data).subscribe()
  }
  checkOldPassword(password: string): Observable<ICustomResponse> {
    return this._http.post<ICustomResponse>(`${this.api}/check-old-password`, { password })
  }

  resetPassword(password: any): Observable<ICustomResponse> {
    return this._http.put<ICustomResponse>(`${this.api}/change-password`, { password })
  }

  subscribeUser(artistId: string) {
    return this._http.put(`${this.api}/subscribe-user`, { artistId })
  }


  uploadShorts(data: IUploadShortsDto): Observable<IShortsUploadResponse> {
    return this._http.post<IShortsUploadResponse>(`${this.api}/upload-shorts`, data)
  }

  trimVideo(data: { start: string, end: string, file: File }) {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append("start", data.start)
    formData.append('end', data.end)
    return this._http.post<IShortsUploadResponse>(`${this.api}/trim-video`, formData)
  }


  shortsUpload(fileuploadurl: string, contenttype: string, file: File) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers,
        reportProgress: true,

      });
    return this._http.request(req)
  }

  getArtists(data: { query?: string, nextPage?: number } = { query: '', nextPage: 1 }): Observable<{ artists: IUserData[], userId: string }> {
    return this._http.get<{ artists: IUserData[], userId: string }>(`${this.api}/get-artists?artist=${data.query}&page=${data.nextPage}&perPage=8`)
  }

  getArtistMedias() {
    return this._http.get(`${this.api}/get-medias`)
  }

 
  getPlaylistSong(playlistId: string) {
    return this._http.get(`${this.api}/get-playlist-song?songId=${playlistId}`)
  }

  getMemberShip(): Observable<IMemberShip[]> {
    return this._http.get<IMemberShip[]>(`${this.api}/get-membership`)
  }

  checkActiveMemberShip() {
    return this._http.head(`${this.api}/check-active-membership`)
  }


  getArtistMedia(artistId: string): Observable<IUserMedia> {
    return this._http.get<IUserMedia>(`${this.api}/get-artist-media?artistId=${artistId}`)
  }

  

}

