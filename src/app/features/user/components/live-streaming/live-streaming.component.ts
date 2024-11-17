import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { environment } from 'src/environment/environment';
import { io,Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.css']
})
export class LiveStreamingComponent {
  viewerCount: number = 1234;
  streamerName:string = 'cool'
  peerConnection!:RTCPeerConnection
  streamTitle:string = 'that wanna be beautiful'
  localStream!: MediaStream;
  rtcTrackEvent!:RTCTrackEvent
  private uuid:string | null = null
  @ViewChild('live') live!: ElementRef<HTMLVideoElement>;
  constructor(private route: ActivatedRoute,private _socketService:SocketService) {  }
 
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        this.uuid = params.get('uuid');
        const peer = this.createPeer();
        peer.addTransceiver("video", { direction: "recvonly" })
        peer.addTransceiver("audio", { direction: "recvonly" })
      },
      error:(err)=>{
        console.error(err)
      }
    });
  }

  createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          }
      ]
  })
    peer.ontrack = this.handleTrackEvent
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer);
    return peer
  }


  async  handleNegotiationNeededEvent(peer: RTCPeerConnection) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
      sdp: peer.localDescription,
      key:this.uuid
    };
    this._socketService.watchLive(payload)
     this._socketService.on().subscribe({
      next:(payload:any)=>{
        const desc = new RTCSessionDescription(payload.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
      },
      error:(err)=>{
        console.error(err)
      }
     })
    // socket.on('result',(data)=>{
    //   console.log(data)
    //   const desc = new RTCSessionDescription(data.sdp);
    //   peer.setRemoteDescription(desc).catch(e => console.log(e));
    // })
  }
  // socket.on('invalid',(message)=>{
  //   alert(message)
  // })
  
  
   handleTrackEvent(event:any) {
    const videoElement = document.getElementById('video') as HTMLVideoElement
    videoElement.srcObject = event.streams[0]
  }


  sendMessage(message: string): void { 
    console.log('Sending message:', message);
  }

}
