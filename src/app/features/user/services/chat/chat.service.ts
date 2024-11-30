import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChats } from 'src/app/core/interfaces/IChats';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api = `${environment.apiUrl}/chat`

  constructor(private _http:HttpClient) { }
  getChats(streamKey: string): Observable<IChats[]> {
    return this._http.get<IChats[]>(`${this.api}/get-chats?streamKey=${streamKey}`)
  }

}
