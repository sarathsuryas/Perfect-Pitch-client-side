import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket:Socket
constructor(){
  this.socket = io(environment.apiUrl)  
}

// broadcast streams
public broadCast(payload:any) {
  this.socket.emit('broadcast',payload)
}

public on() {
  return new Observable(observer=>{
    this.socket.on("payload",(payload)=>{
      observer.next(payload)
    })
    this.socket.on('result',(payload)=>{
      observer.next(payload)
    })
  })
}

public watchLive(payload:any) {
  this.socket.emit('watch live',payload)
}


}
