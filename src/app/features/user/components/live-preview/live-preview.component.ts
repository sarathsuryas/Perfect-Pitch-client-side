import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateLiveComponent } from '../create-live/create-live.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MessageService } from 'primeng/api';
import { SocketService } from '../../services/socket/socket.service';
import { LiveStreamingService } from '../../services/live-streaming/live-streaming.service';
import { iceConfiguration } from 'src/app/core/turnConfig';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.css']
})
export class LivePreviewComponent {
  isCameraOn: boolean = false;
  success: boolean = false
  streamKey: string = ''
  public start: boolean = false
  localStream: MediaStream | undefined | null;
  peerConnection: RTCPeerConnection | undefined;
  isBroadcasting = false;
  
  statusMessage = 'Status: Not Broadcasting';
  statusClass = 'offline';
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollArea') private scrollArea!: ElementRef;


  constructor(
    private dialog: MatDialog,
    private _socketService: SocketService,
    private _liveStreamingService:LiveStreamingService
  ) {
  }
  


  ngOnInit(): void {
    this._socketService.onStartBroadcast().subscribe(() => {
     this.setupPeerConnection()
    });
    this._socketService.broadcasterAnswer$.subscribe({
      next:(answer)=>{
        this.peerConnection?.setRemoteDescription(answer)
      },
      error:(err)=>{
        console.error("error from the setRemoteDescription",err)
      }
    })
    this._socketService.iceCandidate$.subscribe({
      next:(candidate)=>{
        this.peerConnection?.addIceCandidate(new RTCIceCandidate(candidate))
      },
      error:(err)=>{
        console.error("error from add Ice candidate",err)
      }
    })
  }
 
  async toggleCamera(): Promise<void> {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.videoElement.nativeElement.srcObject = this.localStream;

        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = this.localStream;
          this.videoElement.nativeElement.play();
        }
        this.isCameraOn = true;
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    }
  }
 ///
  startBroadcasting() {
    if (!this.localStream) {
      alert("no local stream")
      return;
    }
    this.success = true
    this.start = true
    this.isBroadcasting = true;
    this.isCameraOn = true;
    this._socketService.startBroadcast()    
  }

  
  // 
  stopCamera(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
      this._socketService.stopBroadcast(this.streamKey)
      this._socketService.disconnect()
      this._liveStreamingService.stopStreaming(this.streamKey).subscribe()
      this.isCameraOn = false;
      this.start = false
    }
  }

  ///
  createLiveStream(): void {
    const dialogRef = this.dialog.open(CreateLiveComponent,
      { width: '600px', height: '600px' })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        this._liveStreamingService.createLive(value).subscribe({
          next: (value) => {
            if (value.success) {
              this.success = value.success
              this.streamKey = value.streamId
              this._socketService.connect()
            }
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

   setupPeerConnection() {
    const configuration = {
        iceServers: [
            {
                urls: "stun:stun.relay.metered.ca:80",
            },
            {
                urls: "turn:global.relay.metered.ca:80",
                username: "836c17083ecba16b626af6f7",
                credential: "j/Du96pT1PjJXgP/",
            },
            {
                urls: "turn:global.relay.metered.ca:80?transport=tcp",
                username: "836c17083ecba16b626af6f7",
                credential: "j/Du96pT1PjJXgP/",
            },
            {
                urls: "turn:global.relay.metered.ca:443",
                username: "836c17083ecba16b626af6f7",
                credential: "j/Du96pT1PjJXgP/",
            },
            {
                urls: "turns:global.relay.metered.ca:443?transport=tcp",
                username: "836c17083ecba16b626af6f7",
                credential: "j/Du96pT1PjJXgP/",
            },
        ],
    };

    this.peerConnection = new RTCPeerConnection(configuration);
    // Attach the debugging event listeners immediately
    this.peerConnection.onconnectionstatechange = () => {
        console.log(`Broadcaster connection state: ${this.peerConnection?.connectionState}`);
        if (this.peerConnection?.connectionState === 'connected') {
            console.log('Broadcaster fully connected!');
        }
    };

    this.peerConnection.oniceconnectionstatechange = () => {
        console.log(`Broadcaster ICE connection state: ${this.peerConnection?.iceConnectionState}`);
    };


    // Add all tracks from local stream to the peer connection
    this.localStream?.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, this.localStream as MediaStream);
    });

    // ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this._socketService.sendIceCandidate(event.candidate,this.streamKey)
            // socket.emit('broadcaster_ice_candidate', { candidate: event.candidate, roomId: roomId });
        }
    };

    // Create offer
    this.peerConnection.createOffer()
        .then(offer => {
            return this.peerConnection?.setLocalDescription(offer)
        })
        .then(() => {
          this._socketService.broadcasterOffer( this.peerConnection?.localDescription as RTCSessionDescription,this.streamKey)
        })
        .catch(error => {
            console.error('Error creating offer:', error);
        });
}




  

  ngOnDestroy(): void 
  {
    this._socketService.disconnect()
    if(this.streamKey){
      this._socketService.removeFromRoom(this.streamKey)
    }
    this.stopCamera();
  }



}
