import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of ,delay} from 'rxjs';
import { IVideoUploadDto } from 'src/app/core/dtos/IVideoUpload.dto';
import { IResponseVideo } from 'src/app/core/interfaces/IResponseVideo';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})     
export class VideoService {
  private api = `${environment.apiUrl}/video`
  private totalItems=100;
  constructor(private _http:HttpClient) { }
  submitVideoDetails(data: IVideoUploadDto): Observable<{ videoId: string }> {
    return this._http.post<{ videoId: string }>(`${this.api}/post-video-details`, data)
  }
  // getVideoList(data: { query?: string, nextPage?: number } = { query: '', nextPage: 1 }): Observable<IVideoList[]> {
  //  
  // }
getVideoList(page=1,itemsPerPage=6,query='') {
   return this._http.get<IVideoList[]>(`${this.api}/video-list?video=${query}&page=${page}&perPage=${itemsPerPage}`).pipe(delay(500)) 
}


  getVideoDetails(id: string): Observable<IResponseVideo> {
    return this._http.get<IResponseVideo>(`${this.api}/get-video-page-details?id=${id}`)
  }
  likeVideo(videoId: string): Observable<string> {
    return this._http.put<string>(`${this.api}/like-video`, { videoId })
  }
}
