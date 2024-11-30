import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentReplyDto } from 'src/app/core/dtos/ICommentReply.dto';
import { IReplyToReplyDto } from 'src/app/core/dtos/IReplyToReply.dto';
import { IVideoCommentDto } from 'src/app/core/dtos/IVideoComment.dto';
import { ICommentReply } from 'src/app/core/interfaces/ICommentReply';
import { ICommentResponse } from 'src/app/core/interfaces/ICommentResponse';
import { IComment } from 'src/app/core/interfaces/IComments';
import { IReplyToReply } from 'src/app/core/interfaces/IReplyToReply';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private api = `${environment.apiUrl}/comments`
  constructor(private _http:HttpClient) { }
  commentVideo(comment: IVideoCommentDto): Observable<IComment> {
    return this._http.post<IComment>(`${this.api}/add-video-comment`, comment)
  }

  likeComment(commentId: string) {
    return this._http.patch(`${this.api}/like-comment`, { commentId })
  }

  getComments(videoId: string): Observable<ICommentResponse[]> {
    return this._http.get<ICommentResponse[]>(`${this.api}/get-comments?id=${videoId}`)
  }  

  replyComment(reply: ICommentReplyDto) {
    return this._http.post(`${this.api}/reply-comment`, { reply })
  }
  getReply(commentId: string): Observable<ICommentReply[]> {
    return this._http.get<ICommentReply[]>(`${this.api}/get-replies?id=${commentId}`)
  }

  likeReply(replyId: string) {
    return this._http.patch(`${this.api}/like-reply`, { replyId })
  } 
  likeReplyToReply(replyToReplyId: string) {
    return this._http.patch(`${this.api}/like-reply-to-reply`, { replyToReplyId })
  }
  replyToReply(data: IReplyToReplyDto) {
    return this._http.post(`${this.api}/reply-to-reply`, data)
  }
  getRepliesToReply(replyId: string): Observable<IReplyToReply[]> {
    return this._http.get<IReplyToReply[]>(`${this.api}/get-replies-to-reply?replyId=${replyId}`)
  }

}
