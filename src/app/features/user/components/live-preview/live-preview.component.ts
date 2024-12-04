import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateLiveComponent } from '../create-live/create-live.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MessageService } from 'primeng/api';
import { SocketService } from '../../services/socket/socket.service';
import { LiveStreamingService } from '../../services/live-streaming/live-streaming.service';
import { turnConfig } from 'src/app/core/turnConfig';

@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.css']
})
export class LivePreviewComponent {
  isCameraOn: boolean = false;
  success: boolean = false
  private stream: MediaStream | null = null;
  streamKey: string = ''
  public start: boolean = false
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('scrollArea') private scrollArea!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _messageService: MessageService,
    private _socketService: SocketService,
    private _liveStreamingService:LiveStreamingService
  ) {
  }
  


  ngOnInit(): void {

  }
 

  async toggleCamera(): Promise<void> {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.videoElement.nativeElement.srcObject = this.stream;

        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
          this.videoElement.nativeElement.play();
        }
        this.isCameraOn = true;
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this._socketService.disconnect()
      this._liveStreamingService.stopStreaming(this.streamKey).subscribe()
      this.isCameraOn = false;
      this.success = false
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


  async init() {
    
    this.start = true
    const peer = this.createPeer();
    this.stream?.getTracks().forEach(track => peer.addTrack(track, this.stream as MediaStream));
  }
  createPeer() {
    const peer = new RTCPeerConnection({
     iceServers:turnConfig.iceServers
    });
    peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer);

    return peer;
  }

  async handleNegotiationNeededEvent(peer: any) {

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
      key: this.streamKey
    };

    this._socketService.broadCast(payload) as any
    this._socketService.on().subscribe({
      next: (payload: any) => {
        const desc = new RTCSessionDescription(payload.sdp);
        peer.setRemoteDescription(desc).catch((e: Error) => console.log(e.message));
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


}
