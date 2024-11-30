import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateLiveStreamDto } from 'src/app/core/dtos/ICreateLiveStream.dto';
import { ILive } from 'src/app/core/interfaces/ILive';
import { ILiveStreams } from 'src/app/core/interfaces/ILiveStreams';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamingService {
  private api = `${environment.apiUrl}/live-streaming`

  constructor(private _http:HttpClient) { }

  createLive(data: ICreateLiveStreamDto): Observable<{ success: boolean, streamId: string }> {
    const formData = new FormData();
    formData.append('file', data.thumbNail);
    formData.append('description', data.description);
    formData.append('title', data.title);
    formData.append('genreId', data.genreId)
    return this._http.post<{ success: boolean, streamId: string }>(`${this.api}/create-live`, formData)
  }
  getStreamings(): Observable<ILiveStreams[]> {
    return this._http.get<ILiveStreams[]>(`${this.api}/get-streams`)
  }
  getLiveVideoDetails(streamKey: string): Observable<ILive> {
    return this._http.get<ILive>(`${this.api}/get-live-video-details?streamKey=${streamKey}`)
  }  
  stopStreaming(streamKey: string) {
    return this._http.delete(`${this.api}/stop-stream`, { body: { streamKey } })
  }

  

}
