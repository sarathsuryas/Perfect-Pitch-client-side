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
import { environment } from 'src/environment/environment.prod';

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
  socket:Socket
  statusMessage = 'Status: Not Broadcasting';
  statusClass = 'offline';
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollArea') private scrollArea!: ElementRef;


  constructor(
    private dialog: MatDialog,
    private _liveStreamingService:LiveStreamingService
  ) {
    this.socket = io(environment.apiUrl)
  }
  


  ngOnInit(): void {
    this.socket.on("start_broadcast",()=>{
     this.setupPeerConnection()
    })
    this.socket.on('broadcaster_answer',(description)=>{
      this.peerConnection?.setRemoteDescription(description)
      .catch(error => {
          console.error('Error setting remote description:', error);
      });
    })
    this.socket.on('broadcaster_ice_candidate', (candidate) => {
      if (this.peerConnection) {
          //    console.log('candidate from answer',candidate)
          this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
              .catch(error => {
                  console.error('Error adding ICE candidate:', error);
              });
      }
  });
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
    this.socket.emit("start_broadcast")

  }

  
  // 
  stopCamera(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
      
      this._liveStreamingService.stopStreaming(this.streamKey).subscribe()
      this.isCameraOn = false;
      this.start = false
      this.socket.emit('stop_broadcast', this.streamKey)
      if (this.peerConnection) {
        this.peerConnection.close();
    }

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
              console.log('streamkey,///',this.streamKey)

            }
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
      // this.socket.emit('disconnect')
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
            this.socket.emit('broadcaster_ice_candidate', { candidate: event.candidate, streamKey:this.streamKey });
        }
    };

    // Create offer
    this.peerConnection.createOffer()
        .then(offer => {
            return this.peerConnection?.setLocalDescription(offer)
        })
        .then(() => {
            this.socket.emit('broadcaster_offer', { offer: this.peerConnection?.localDescription, streamKey:this.streamKey });
        })
        .catch(error => {
            console.error('Error creating offer:', error);
        });
}



  

  ngOnDestroy(): void 
  {
    // this._socketService.disconnect()
    // if(this.streamKey){
    //   this._socketService.removeFromRoom(this.streamKey)
    // }
    this.stopCamera();
  }



}
