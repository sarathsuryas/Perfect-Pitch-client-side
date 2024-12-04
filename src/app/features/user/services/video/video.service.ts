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
 
getVideoList(page=1,itemsPerPage=6) {
   return this._http.get<IVideoList[]>(`${this.api}/video-list?page=${page}&perPage=${itemsPerPage}`).pipe(delay(500)) 
}
getIndividualVideos(page=1,itemsPerPage=6,artistId:string) {
  return this._http.get<IVideoList[]>(`${this.api}/individual-videos?page=${page}&perPage=${itemsPerPage}&artistId=${artistId}`).pipe(delay(500)) 
}


searchVideo(query:string) {
  return this._http.get<IVideoList[]>(`${this.api}/search-video?video=${query}`)
}

  getVideoDetails(id: string): Observable<IResponseVideo> {
    return this._http.get<IResponseVideo>(`${this.api}/get-video-page-details?id=${id}`)
  }
  likeVideo(videoId: string): Observable<string> {
    return this._http.put<string>(`${this.api}/like-video`, { videoId })
  }
}
