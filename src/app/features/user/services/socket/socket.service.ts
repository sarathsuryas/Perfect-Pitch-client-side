import { Injectable } from '@angular/core';
import { io,Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

socket!:Socket
constructor(){
  this.socket = io(environment.apiUrl)
  
}
startLive() {
  
}
// emitOffer(offer:any) {
//   this.socket.emit('offer',offer,{streamId:'102030'})
// }

findOffer() {
  
}


}
