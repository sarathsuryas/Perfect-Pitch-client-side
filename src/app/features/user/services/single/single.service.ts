import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SingleService {
  private api = `${environment.apiUrl}/single`
  constructor(private _http:HttpClient) { }

}
