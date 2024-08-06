import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminData } from 'src/app/core/interfaces/IAdminData';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api ='http://localhost:5000/admin'
  constructor(private readonly _http:HttpClient) { }

  login(email:string,password:string):Observable<IAdminData> {
    return this._http.post<IAdminData>(`${this.api}/login`,{email,password})
  }
}
