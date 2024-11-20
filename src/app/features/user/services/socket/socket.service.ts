import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io,Socket } from 'socket.io-client';
import { IMessageDto } from 'src/app/core/dtos/IMessage.dto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
private socket:Socket
constructor(){
  this.socket = io(environment.apiUrl,{ autoConnect: false })  
}

// broadcast streams
public connect() {
  if(!this.socket.connected){
    this.socket.connect()
  } 
}

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

public disconnect() {
  this.socket.disconnect()
}

public removeFromRoom(room:string) {
  this.socket.emit('removeFromRoom',room)
}

public sendMessage(message:IMessageDto) {
  this.socket.emit("message",message)
}

public recieveMessage():Observable<IMessageDto> {
  return new Observable(observer=>{
    this.socket.on("message",(data)=>{
      observer.next(data as IMessageDto) 
    })
  })
}

}
