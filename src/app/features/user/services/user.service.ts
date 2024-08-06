import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../../../store/user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUserDto } from 'src/app/core/dtos/registerUserDto';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { CookieService } from 'ngx-cookie-service';
import { AddUserDto } from 'src/app/core/dtos/addUser.dto';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'http://localhost:5000/users'
  constructor(private readonly _http: HttpClient, private readonly _cookieService: CookieService) { }

  private get adminToken() {
    const token = this._cookieService.get('adminToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'bearer': `${token}`
    })
  }


  userRegister(userData: RegisterUserDto): Observable<userModel> {
    return this._http.post<userModel>(`${this.api}/register`, userData)
  }

  verifyOtp(userData: string, otp: string): Observable<string> {
    return this._http.post<string>(`${this.api}/verify-otp`, { userData, otp })
  }

  userLogin(email: string, password: string): Observable<IUserData> {
    return this._http.post<IUserData>(`${this.api}/login`, { email, password })
  }

  getUsersData(): Observable<userModel[]> {
    return this._http.get<userModel[]>(`${this.api}/get-users`, { headers: this.adminToken })
  }
  blockUser(email: string): Observable<userModel[]> {
    return this._http.patch<userModel[]>(`${this.api}/block-user`, { email }, { headers: this.adminToken })
  }
  addUser(userData: AddUserDto): Observable<userModel[]> {

    return this._http.post<userModel[]>(`${this.api}/add-user`, userData, { headers: this.adminToken })
  }

  editUser(userData: EditUserDto): Observable<userModel[]> {
    return this._http.patch<userModel[]>(`${this.api}/edit-user`, userData, { headers: this.adminToken })
  }


}
