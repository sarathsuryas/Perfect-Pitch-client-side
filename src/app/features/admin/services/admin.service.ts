import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { map, Observable } from 'rxjs';
import { AddUserDto } from 'src/app/core/dtos/addUser.dto';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { IAddMemberShipDto } from 'src/app/core/dtos/IAddMembership.dto';
import { IAdminData } from 'src/app/core/interfaces/IAdminData';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
import { ITokenData } from 'src/app/core/interfaces/ITokenData';
import { userModel } from 'src/app/store/user/user.model';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = `${environment.apiUrl}/admin`
  constructor(private readonly _http:HttpClient,private _cookieService:CookieService) { }

  login(email:string,password:string):Observable<IAdminData> {
    return this._http.post<IAdminData>(`${this.api}/login`,{email,password},{withCredentials:true})
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
    return this._http.post(`${this.api}/new-password`, {password,AdminId});
  }
 logOut() {
  this._cookieService.remove('adminToken')
 }

 addGenres(genre:string,newId:number,color:string):Observable<{success:boolean}> {
   return this._http.post<{success:boolean}>(`${this.api}/add-genres`,{genre,newId,color})
 }

getGenres():Observable<IGenres[]> {
  return this._http.get<IGenres[]>(`${this.api}/get-genres`)
}

addMemberShip(data:IAddMemberShipDto){
  return this._http.post(`${this.api}/add-membership`,data)
}

getMemberShips():Observable<IMemberShip[]> {
  return this._http.get<IMemberShip[]>(`${this.api}/get-membership`)
}

blockUnblock(id:string,isBlocked:boolean) {
  return this._http.post(`${this.api}/block-unblock`,{id,isBlocked})
}

}
  