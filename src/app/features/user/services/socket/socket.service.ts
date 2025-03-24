import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { IMessageDto } from 'src/app/core/dtos/IMessage.dto';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
public iceCandidate$:Observable<RTCIceCandidate>
public broadcasterAnswer$: Observable<RTCSessionDescription>;
public viewerOffer$:Observable<RTCSessionDescriptionInit>
public viewerIceCandidate$:Observable<RTCIceCandidate>
constructor(private _socket:Socket){
 this.iceCandidate$ =  _socket.fromEvent('broadcaster_ice_candidate') 
 this.broadcasterAnswer$ = _socket.fromEvent('broadcaster_answer')
 this.viewerOffer$ = _socket.fromEvent('viewer_offer')
 this.viewerIceCandidate$ = _socket.fromEvent('viewer_ice_candidate')
}
 
public disconnect() {
  this._socket.disconnect()
}

public removeFromRoom(room:string) {
  this._socket.emit('removeFromRoom',room)
}
public joinRoom(streamKey:string) {
 this._socket.emit('join_room',streamKey)
}
public sendMessage(message:IMessageDto) {
  this._socket.emit("message",message)
}

public recieveMessage():Observable<IMessageDto> {
  return new Observable(observer=>{
    this._socket.on("message",(data:any)=>{
      observer.next(data as IMessageDto) 
    })
  })
}

}
