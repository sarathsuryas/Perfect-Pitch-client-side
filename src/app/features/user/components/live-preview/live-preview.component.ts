import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateLiveComponent } from '../create-live/create-live.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-live-preview',
  templateUrl: './live-preview.component.html',
  styleUrls: ['./live-preview.component.css']
})
export class LivePreviewComponent {
  isCameraOn: boolean = false;
  success:boolean = false
  private stream: MediaStream | null = null;
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;


  constructor(private _userService:UserService,private fb: FormBuilder,private dialog: MatDialog,private _messageService:MessageService) {
  } 
  ngOnInit(): void {
   
  }
  ngOnDestroy(): void {
    this.stopCamera();
  } 

  async toggleCamera(): Promise<void> {
    if (this.isCameraOn) {
      this.stopCamera();
    } else {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio:true });
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
    }
    this.isCameraOn = false;
  }

  createLiveStream(): void {
    const dialogRef = this.dialog.open(CreateLiveComponent,
      { width: '600px',height:'600px'})
      dialogRef.afterClosed().subscribe({
        next:(value)=>{
          this._userService.createLive(value).subscribe({
            next:(value)=>{
              if(value.success) {
             this.success = value.success
              }
            }
          })
        },
        error:(err)=>{
          console.error(err)
        }
      })
  }


  async init() { 
    const peer = this.createPeer();
    this.stream?.getTracks().forEach(track => peer.addTrack(track, this.stream as MediaStream));
}
createPeer() {
  const peer = new RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          }
      ]
  });
  peer.onnegotiationneeded = () => this.handleNegotiationNeededEvent(peer);

  return peer;
}

async handleNegotiationNeededEvent(peer:any) {
 
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
      sdp: peer.localDescription
  };

  const data = await  this._userService.broadcast(payload) as any

  const desc = new RTCSessionDescription(data.sdp); 
  peer.setRemoteDescription(desc).catch((e: Error) => console.log(e.message));

}


}
