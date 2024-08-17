import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { userModel } from '../../../store/user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environment/environment';

@Injectable({ 
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.apiUrl}/users`
  constructor(private readonly _http: HttpClient, private readonly _cookieService: CookieService) { }

  userRegister(userData: RegisterUserDto): Observable<userModel> {
    return this._http.post<userModel>(`${this.api}/register`, userData)
  }

  verifyOtp(userData: string, otp: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/verify-otp`, { userData, otp })
  }

  userLogin(email: string, password: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/login`, { email, password })
  }
  resendOtp(userData:string):Observable<string>{
    return  this._http.post<string>(`${this.api}/resend-otp`,{userData})
  }
  refreshToken():Observable<string> {
    return this._http.post<{accessToken:string}>(`${this.api}/refresh`,{},{withCredentials:true}).pipe(
      map(response=>response.accessToken)
    )
  }  

}
