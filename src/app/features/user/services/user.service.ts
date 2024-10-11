import { Injectable } from '@angular/core';
import { debounceTime, map, Observable, tap } from 'rxjs';
import { userModel } from '../../../store/user/user.model';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environment/environment';
import { ITokenData } from 'src/app/core/interfaces/ITokenData';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { IReturnEdit } from 'src/app/core/interfaces/IReturnEdit';
import { ICustomResponse } from 'src/app/core/interfaces/ICustomResponse';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logOut, removeToken } from 'src/app/store/user/user.action';
import { IVideoUploadDto } from 'src/app/core/dtos/IVideoUpload.dto';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IPreSignedUrls } from 'src/app/core/interfaces/IPresignedUrls';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { ISubmitSongDetailsDto } from 'src/app/core/dtos/ISubmitSongDetails.dto';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';
import { IResponseVideo } from 'src/app/core/interfaces/IResponseVideo';
import { IVideoCommentDto } from 'src/app/core/dtos/IVideoComment.dto';
import { IComment } from 'src/app/core/interfaces/IComments';
import { IGoogleLoginDto } from 'src/app/core/dtos/IGoogleLogin.dto';
import { selectIsAuthUser } from 'src/app/store/user/user.selector';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
import { ICommentReplyDto } from 'src/app/core/dtos/ICommentReply.dto';
import { IUploadShortsDto } from 'src/app/core/dtos/uploadShorts.dto';
import { IShortsUploadResponse } from 'src/app/core/interfaces/IShortsUploadResponse';
import { IShortsResponse } from 'src/app/core/interfaces/IShortsResponse';
import { IAlbumResponse } from 'src/app/core/interfaces/IAlbumResponse';
import { ICreatePlaylistDto } from 'src/app/core/dtos/createPlaylist.dto';
import { IUserPlaylists } from 'src/app/core/interfaces/IUserPlaylist';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { ISongsSameGenre } from 'src/app/core/interfaces/ISongsSameGenre';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = `${environment.apiUrl}/users`
  constructor(private readonly _http: HttpClient, private readonly _cookieService: CookieService, private _router: Router, private readonly _store: Store) { }

  userRegister(userData: RegisterUserDto): Observable<userModel> {
    return this._http.post<userModel>(`${this.api}/register`, userData)
  }

  verifyOtp(userData: string, otp: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/verify-otp`, { userData, otp })
  }

  userLogin(email: string, password: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/login`, { email, password }, { withCredentials: true })
  }
  googleLogin(data: IGoogleLoginDto): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/google-login`, data, { withCredentials: true })
  }

  resendOtp(userData: string): Observable<string> {
    return this._http.post<string>(`${this.api}/resend-otp`, { userData })
  }
  refreshToken(): Observable<string> {
    return this._http.post<{ accessToken: string }>(`${this.api}/refresh`, {}, { withCredentials: true }).pipe(
      map(response => response.accessToken)
    )
  }

  requestReset(email: string): Observable<string> {
    return this._http.post<string>(`${this.api}/req-reset-password`, email);
  }
  ValidPasswordToken(body: { token: string | null }): Observable<ITokenData> {
    return this._http.post<ITokenData>(`${this.api}/valid-password-token`, body);
  }
  newPassword(password: string, UserId: string): Observable<any> {
    return this._http.post(`${this.api}/new-password`, { password, UserId });
  }
  userData(): Observable<IUserData> {
    return this._http.get<IUserData>(`${this.api}/get-user-data`)
  }

  getPresignedUrl(fileName: string, contentType: string,): Observable<ICustomResponse> {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType })
  }


  generatePresignedUrlMedia(fileName: string, contentType: string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType }).toPromise()
  }
  generatePresignedUrlMediaThumbNail(fileName: string, contentType: string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`, { fileName, contentType }).toPromise()
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

  logOut() {
    this._cookieService.delete('token')
    this._cookieService.delete('refreshToken')
    this._store.dispatch(logOut())
    this._store.select(selectIsAuthUser).subscribe((data) => console.log(data))
    this._router.navigate([''])
  }


  submitVideoDetails(data: IVideoUploadDto): Observable<{ videoId: string }> {
    return this._http.post<{ videoId: string }>(`${this.api}/post-video-details`, data)
  }

  getVideoList(): Observable<IVideoList[]> {
    return this._http.get<IVideoList[]>(`${this.api}/video-list`)
  }

  generatePreSignedUrlsForAlbums(detailsForSignedUrls: { name: string, type: string }[]): Observable<IPreSignedUrls> {
    const post_params = JSON.stringify(detailsForSignedUrls)
    return this._http.post<IPreSignedUrls>(`${this.api}/generate-pre-signed-urls`, { post_params })
  }

  audioUpload(fileuploadurl: string, contenttype: string, file: File) {
    const headers = new HttpHeaders({ 'Content-Type': contenttype });
    const req = new HttpRequest(
      'PUT',
      fileuploadurl,
      file,
      {
        headers: headers
      });
    return this._http.request(req).toPromise()
  }

  submitAlbumDetails(data: ISumbitAlbumDetails) {
    const files = JSON.stringify(data)
    return this._http.post(`${this.api}/submit-album-details`, { files })
  }
  getAlbums(): Observable<IAlbumData[]> {
    return this._http.get<IAlbumData[]>(`${this.api}/get-albums`)
  }

  submitSongDetails(data: ISubmitSongDetailsDto) {
    const file = JSON.stringify(data)
    return this._http.post(`${this.api}/submit-audio-details`, { file })
  }

  getAlbumDetails(id: string): Observable<IAlbumResponse> {
    return this._http.get<IAlbumResponse>(`${this.api}/album-details?id=${id}`)
  }

  getVideoDetails(id: string): Observable<IResponseVideo> {
    return this._http.get<IResponseVideo>(`${this.api}/get-video-page-details?id=${id}`)
  }

  getComments(videoId: string): Observable<ICommentResponse[]> {
    return this._http.get<ICommentResponse[]>(`${this.api}/get-comments?id=${videoId}`)
  }

  likeVideo(videoId: string): Observable<string> {
    return this._http.put<string>(`${this.api}/like-video`, { videoId })
  }
  subscribeUser(artistId: string) {
    return this._http.put(`${this.api}/subscribe-user`, { artistId })
  }

  commentVideo(comment: IVideoCommentDto): Observable<IComment> {
    return this._http.post<IComment>(`${this.api}/add-video-comment`, comment)
  }
  likeComment(commentId: string) {
    return this._http.patch(`${this.api}/like-comment`, { commentId })
  }
  replyComment(reply: ICommentReplyDto) {
    return this._http.post(`${this.api}/reply-comment`, { reply })
  }

  getReply(commentId: string): Observable<ICommentReply[]> {
    return this._http.get<ICommentReply[]>(`${this.api}/get-replies?id=${commentId}`)
  }

  likeReply(replyId: string) {
    return this._http.patch(`${this.api}/like-reply`, { replyId })
  }

  uploadShorts(data: IUploadShortsDto): Observable<IShortsUploadResponse> {
    return this._http.post<IShortsUploadResponse>(`${this.api}/upload-shorts`, data)
  }
  
  trimVideo(data:{start:string,end:string,file:File }) {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append("start",data.start)
    formData.append('end',data.end)
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
      reportProgress:true,
      
    });
  return this._http.request(req)
}

submitShortsDetails(data:{caption:string,description:string,uniqueKey:string}) {
 return this._http.post(`${this.api}/submit-shorts-details`,data)
}

getShorts():Observable<IShortsResponse> {
  return this._http.get<IShortsResponse>(`${this.api}/get-shorts`)
}

createPlaylist(data:ICreatePlaylistDto):Observable<{playlistId:string}> {
   return this._http.post<{playlistId:string}>(`${this.api}/create-Playlist`,data)
}

getUserPlalists():Observable<IUserPlaylists[]> {
    return this._http.get<IUserPlaylists[]>(`${this.api}/get-user-playlist`)
}

addToPlaylsit(songId:string,playlistId:string):Observable<{success:boolean,exist:boolean}> {
  return this._http.put<{success:boolean,exist:boolean}>(`${this.api}/add-to-playlist`,{songId,playlistId})
}

getPlaylistSongs(playlistId:string):Observable<IUserPlaylists> {
  return  this._http.get<IUserPlaylists>(`${this.api}/get-playlist-songs?playlistId=${playlistId}`)
}

getGenres():Observable<IGenres[]>{
  return this._http.get<IGenres[]>(`${this.api}/get-genres`)
}

getSameGenreSongs(genreId:string):Observable<ISongsSameGenre[]> {
  return this._http.get<ISongsSameGenre[]>(`${this.api}/get-genre-songs?genreId=${genreId}`)
}

getArtists():Observable<{artists:IUserData[],userId:string}> {
  return this._http.get<{artists:IUserData[],userId:string}>(`${this.api}/get-artists`)
}

}
