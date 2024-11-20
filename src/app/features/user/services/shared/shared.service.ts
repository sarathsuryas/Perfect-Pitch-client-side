import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
private playerIsActive = new BehaviorSubject<boolean>(false)
private songId = new BehaviorSubject<string>('')
constructor() { }
data$ = this.playerIsActive.asObservable()
songId$ = this.songId.asObservable()
changePlayerState(status:boolean){
   this.playerIsActive.next(status)
 }
setSongId(songId:string) {
   this.songId.next(songId)
} 

}
