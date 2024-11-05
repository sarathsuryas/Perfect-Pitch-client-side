import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { environment } from 'src/environment/environment';
import { io,Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.css']
})
export class LiveStreamingComponent {
  streamTitle: string = 'My Awesome Live Stream';
  viewerCount: number = 1234;
  streamerName: string = 'CoolStreamer123';
  socket!:Socket
  peerConnection!:RTCPeerConnection
  localStream!: MediaStream;
  rtcTrackEvent!:RTCTrackEvent
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  private streamSubject = new Subject<MediaStream>();  // Subject to hold the latest stream
  public latestStream$ = this.streamSubject.asObservable(); 
  constructor() { 
    this.socket = io(environment.apiUrl)
    console.log("Socket", this.socket)
    this.peerConnection = new RTCPeerConnection({
       iceServers: [{ urls: 'stun:stun.stunprotocol.org' }]
    });
    console.log("peerConnection", this.peerConnection)
    this.socket.emit('findOffer', { user: "sarath", streamId: '102030' });

  }
 

  // ngOnInit(): void {
  //   const videoElement = document.getElementById('test') as HTMLVideoElement;

    

  //   this.socket.emit('findOffer', { user: "sarath", streamId: '102030' });
  //   this.socket.on("sendOffer", (offer) => {
  //     this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer.sdp));
  //   });
    
  //   this.peerConnection.ontrack = (event) => {
  //     if (videoElement) {
  //       console.log(event,'///////////////////////////////////////////')
  //       videoElement.srcObject = event.streams[0];  // Attach the incoming stream to the video element
  //     }
  //   };
  

  //  console.log('///////',this.localStream)
  // } 

  ngOnInit(): void {
   
    const videoElement = document.getElementById('test') as HTMLVideoElement;  
   console.log("videoElement",videoElement)
    this.socket.on("sendOffer", (offer) => {
      if (offer && offer.sdp && offer.type) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => console.log("Remote description set successfully"))
          .catch(error => console.error("Error setting remote description:", error));
        this.peerConnection.ontrack = (event) => {
          console.log('hekki')
         //  this.localStream = event.streams[0]
         console.log(event.streams)
           videoElement.srcObject = event.streams[0]
    
        };
      } else {
        console.error("Received offer is not a valid RTCSessionDescriptionInit object:", offer);
      }
    });
  }

  
  sendMessage(message: string): void { 
    console.log('Sending message:', message);
  }

}
