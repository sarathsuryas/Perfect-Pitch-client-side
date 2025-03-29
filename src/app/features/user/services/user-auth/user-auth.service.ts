import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IGoogleLoginDto } from 'src/app/core/dtos/IGoogleLogin.dto';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { ITokenData } from 'src/app/core/interfaces/ITokenData';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { logOut } from 'src/app/store/user/user.action';
import { userModel } from 'src/app/store/user/user.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private api = `${environment.apiUrl}/user-auth`
  constructor(private _http:HttpClient,private _store:Store,private _router:Router) { }
   behaviorSubject = new BehaviorSubject<boolean>(false);

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

  logOut() {
    localStorage.removeItem('token')
    this._store.dispatch(logOut())
    this._router.navigate([''])
    setTimeout(()=>{

      localStorage.removeItem('g-login')
    },1000)
  } 

}
