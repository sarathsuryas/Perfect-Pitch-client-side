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
 

public connect() {
 
    this._socket.connect()
  
}


public startBroadcast() {
  this._socket.emit('start_broadcast');
}
public onStartBroadcast() {
  return this._socket.fromEvent('start_broadcast');
}


public broadcasterOffer(localDescription:RTCSessionDescription,streamKey:string) {
  this._socket.emit('broadcaster_offer', { offer:localDescription,streamKey:streamKey });
}

public sendIceCandidate(icecandidate:RTCIceCandidate,streamKey:string) {
  this._socket.emit('broadcaster_ice_candidate', { candidate: icecandidate, streamKey: streamKey });
}

public stopBroadcast(streamKey:string) {
  this._socket.emit('stop_broadcast', streamKey)
}

public watchLive(payload:any) {
  this._socket.emit('watch live',payload)
}

public disconnect() {
  this._socket.disconnect()
}

public removeFromRoom(room:string) {
  this._socket.emit('removeFromRoom',room)
}
public viewerRequest(streamKey:string) {
  this._socket.emit("viewer_request", streamKey);
}

public viewerAnswer(answer:RTCSessionDescriptionInit) {
 this._socket.emit('viewer_answer',answer)
}

public viewerIceCandidate(candidate:RTCIceCandidate) {
 this._socket.emit('viewer_ice_candidate',candidate)
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
