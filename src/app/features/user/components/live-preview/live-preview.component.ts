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
  socket: Socket;
  localStream: MediaStream | undefined | null;
  peerConnection: RTCPeerConnection | undefined;
  isBroadcasting = false;
  
  statusMessage = 'Status: Not Broadcasting';
  statusClass = 'offline';
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollArea') private scrollArea!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _messageService: MessageService,
    private _socketService: SocketService,
    private _liveStreamingService:LiveStreamingService
  ) {
    this.socket = io('https://perfet-pitch-service.site');
  }
  


  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    this.socket.on('broadcaster_exists', () => {
      this.updateStatus('Another broadcaster is already active. Please try again later.', 'offline');
      this.stopBroadcasting();
    });
    this.socket.on('broadcaster_answer', (description) => {
      if (this.peerConnection) {
        this.peerConnection.setRemoteDescription(description)
          .catch(error => {
            console.error('Error setting remote description:', error);
          });
      }
    });
    
    this.socket.on('broadcaster_ice_candidate', (candidate) => {
      if (this.peerConnection) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
          .catch(error => {
            console.error('Error adding ICE candidate:', error);
          });
      }
    });
    
    // Handle page unload
    window.addEventListener('beforeunload', () => {
      this.cleanupResources();
    });

  }
  cleanupResources() {
    if (this.isBroadcasting) {
      this.socket.emit('disconnect');
    }
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
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

  startBroadcasting() {
    if (!this.localStream) {
      this.updateStatus('Please start your camera first', 'offline');
      return;
    }
    
    this.socket.emit('broadcaster');
    this.setupPeerConnection();
    this.success = true
    this.start = true
    this.isBroadcasting = true;
    this.isCameraOn = true;
  }

  setupPeerConnection() {
    const configuration = {
      iceServers: [{   urls: [ "stun:bn-turn2.xirsys.com" ]}, {   username: "o8_s2lbVKiqxpNa5Ntw5kG_h7g9zYj-AbK49RHWtnH26b_exoUgSkD5MrvzAQkpMAAAAAGcrwiBzYXJhdGhz",   credential: "90886c3c-9c74-11ef-8e6e-0242ac140004",   urls: [       "turn:bn-turn2.xirsys.com:80?transport=udp",       "turn:bn-turn2.xirsys.com:3478?transport=udp",       "turn:bn-turn2.xirsys.com:80?transport=tcp",       "turn:bn-turn2.xirsys.com:3478?transport=tcp",       "turns:bn-turn2.xirsys.com:443?transport=tcp",       "turns:bn-turn2.xirsys.com:5349?transport=tcp"   ]}]
    };
    
    this.peerConnection = new RTCPeerConnection(configuration);
    
    // Add all tracks from local stream to the peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        if (this.peerConnection && this.localStream) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });
    }
    
    // ICE candidate handling
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('broadcaster_ice_candidate', event.candidate);
        }
      };
      
      // Create offer
      this.peerConnection.createOffer()
        .then(offer => {
          if (this.peerConnection) {
            return this.peerConnection.setLocalDescription(offer);
          }
          return Promise.reject('Peer connection not available');
        })
        .then(() => {
          if (this.peerConnection && this.peerConnection.localDescription) {
            this.socket.emit('broadcaster_offer', this.peerConnection.localDescription);
            this.updateStatus('Broadcasting started. Waiting for viewers...', 'online');
          }
        })
        .catch(error => {
          console.error('Error creating offer:', error);
          this.updateStatus(`Error starting broadcast: ${error.message}`, 'offline');
        });
    }
  }

  stopCamera(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
      this._socketService.disconnect()
      this._liveStreamingService.stopStreaming(this.streamKey).subscribe()
      this.isCameraOn = false;
      this.start = false
    }
  }


  createLiveStream(): void {
    this._socketService.connect()
    const dialogRef = this.dialog.open(CreateLiveComponent,
      { width: '600px', height: '600px' })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        this._liveStreamingService.createLive(value).subscribe({
          next: (value) => {
            if (value.success) {
              this.success = value.success
              this.streamKey = value.streamId
            }
          }
        })
      },
      error: (err) => {
        console.error(err)
      }
    })
  }





  

  ngOnDestroy(): void 
  {
    this._socketService.disconnect()
    if(this.streamKey){
      this._socketService.removeFromRoom(this.streamKey)
    }
    this.stopCamera();
  }

  stopBroadcasting() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = undefined;
    }
    
    this.isBroadcasting = false;
    this.updateStatus('Broadcasting stopped', 'offline');
  }

  updateStatus(message: string, className: string) {
    this.statusMessage = `Status: ${message}`;
    this.statusClass = className;
  }

}
