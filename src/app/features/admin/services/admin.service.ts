import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddUserDto } from 'src/app/core/dtos/addUser.dto';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { IAdminData } from 'src/app/core/interfaces/IAdminData';
import { ITokenData } from 'src/app/core/interfaces/ITokenData';
import { userModel } from 'src/app/store/user/user.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
 
  private api = `${environment.apiUrl}/admin`
  constructor(private readonly _http:HttpClient) { }

  login(email:string,password:string):Observable<IAdminData> {
    return this._http.post<IAdminData>(`${this.api}/login`,{email,password})
  }
  getUsersData(search:string = ''): Observable<userModel[]> {

    return this._http.get<userModel[]>(`${this.api}/get-users?search=${search}`)
  }
  blockUser(email: string): Observable<userModel[]> {
    return this._http.patch<userModel[]>(`${this.api}/block-user`, { email })
  }
  addUser(userData: AddUserDto): Observable<userModel[]> {

    return this._http.post<userModel[]>(`${this.api}/add-user`, userData)
  }

  editUser(userData: EditUserDto): Observable<userModel[]> {
    return this._http.patch<userModel[]>(`${this.api}/edit-user`, userData)
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
  newPassword(password:string,AdminId:string): Observable<any> {
    console.log(password)
    return this._http.post(`${this.api}/new-password`, {password,AdminId});
  }


}
