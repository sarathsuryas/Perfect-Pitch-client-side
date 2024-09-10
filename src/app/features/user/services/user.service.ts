import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
import { logOut } from 'src/app/store/user/user.action';
import { IVideoUploadDto } from 'src/app/core/dtos/IVideoUpload.dto';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IPreSignedUrls } from 'src/app/core/interfaces/IPresignedUrls';
import { ISumbitAlbumDetails } from 'src/app/core/dtos/ISubmitAlbumDetails.dto';

@Injectable({ 
  providedIn: 'root'
})
export class UserService {
  
  private api = `${environment.apiUrl}/users`
  constructor(private readonly _http: HttpClient, private readonly _cookieService: CookieService,private _router:Router,private readonly _store:Store) { }

  userRegister(userData: RegisterUserDto): Observable<userModel> {
    return this._http.post<userModel>(`${this.api}/register`, userData)
  }

  verifyOtp(userData: string, otp: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/verify-otp`, { userData, otp })
  }

  userLogin(email: string, password: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/login`, { email, password },{withCredentials:true})
  }
  resendOtp(userData:string):Observable<string>{
    return  this._http.post<string>(`${this.api}/resend-otp`,{userData})
  }
  refreshToken():Observable<string> {
    return this._http.post<{accessToken:string}>(`${this.api}/refresh`,{},{withCredentials:true}).pipe(
      map(response=>response.accessToken)
    )
  }  

  requestReset(email:string): Observable<string> {
    return this._http.post<string>(`${this.api}/req-reset-password`, email);
  }
  ValidPasswordToken(body:{token:string|null}): Observable<ITokenData> {
    return this._http.post<ITokenData>(`${this.api}/valid-password-token`, body);
  }
  newPassword(password:string,UserId:string): Observable<any> {
    return this._http.post(`${this.api}/new-password`, {password,UserId});
  }
  userData():Observable<IUserData> {
     return this._http.get<IUserData>(`${this.api}/get-user-data`)
  } 

  getPresignedUrl(fileName:string,contentType:string,uploadType:string):Observable<ICustomResponse> {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`,{fileName,contentType,uploadType})
  }


   generatePresignedUrlVideo(fileName:string,contentType:string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`,{fileName,contentType}).toPromise()
  }
  generatePresignedUrlVideoThumbNail(fileName:string,contentType:string) {
    return this._http.post<ICustomResponse>(`${this.api}/generate-presigned-url`,{fileName,contentType}).toPromise()
  }

  profileImageUpload(fileuploadurl:string, contenttype:string, file:File): Observable<any> {
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
  
  videoUpload(fileuploadurl:string, contenttype:string, file:File){
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


  videoThumbNailUpload(fileuploadurl:string, contenttype:string, file:File) {
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

  

  editProfile(data:EditUserDto) { 
      this._http.put<IReturnEdit>(`${this.api}/edit-profile`,data).subscribe()
  }
  checkOldPassword(password:string):Observable<ICustomResponse> {
      return this._http.post<ICustomResponse>(`${this.api}/check-old-password`,{password})
  }
  
  resetPassword(password:any):Observable<ICustomResponse> {
    return this._http.put<ICustomResponse>(`${this.api}/change-password`,{password})
  }

  logOut() {
    this._cookieService.delete('token')
    this._cookieService.delete('refreshToken')
    this._store.dispatch(logOut())
    this._router.navigate([''])
  }

 
 submitVideoDetails(data:IVideoUploadDto):Observable<{videoId:string}> {
  return this._http.post<{videoId:string}>(`${this.api}/post-video-details`,data)
 } 

getVideoList():Observable<IVideoList[]> {
  return this._http.get<IVideoList[]>(`${this.api}/video-list`)
}

generatePreSignedUrlsForAlbums(detailsForSignedUrls:{name:string,type:string}[]):Observable<IPreSignedUrls> {
const  post_params = JSON.stringify(detailsForSignedUrls)
return this._http.post<IPreSignedUrls>(`${this.api}/generate-pre-signed-urls`,{post_params})
}

audioUpload(fileuploadurl:string, contenttype:string, file:File){
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

submitAlbumDetails(data:ISumbitAlbumDetails) {
  const files = JSON.stringify(data)
   return this._http.post(`${this.api}/submit-album-details`,{files})
}

}
