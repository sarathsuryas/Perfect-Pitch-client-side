import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { io,Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-create-live',
  templateUrl: './create-live.component.html',
  styleUrls: ['./create-live.component.css']
})
export class CreateLiveComponent implements OnInit {
 
  constructor(private _userService:UserService,private fb: FormBuilder) {
    this.socket = io(environment.apiUrl)
  }
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  isCameraOn = false;
  isModalOpen = false;
  thumbnail: string = '';
  title: string = '';
  description: string = '';
  stream!:MediaStream
  peerConnection = new RTCPeerConnection();
  thumbnailPreview: string | ArrayBuffer | null = null;
  thumbnailFile: File | null = null;
  isMuted: boolean = true; 
  liveForm!:FormGroup
  socket!:Socket

  
  ngOnInit(): void {
   this.liveForm = this.fb.group({
    title:['',Validators.required],
    description:['',Validators.required]
   })
   this.socket.on('answer',(data)=>{
   })
  }

  toggleCamera() {
    if(this.isCameraOn) {
      this.stopBothVideoAndAudio(this.stream)
    } 
    if(!this.isCameraOn) {
      navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
         const videoTag =  document.getElementById('preview') as HTMLVideoElement
         videoTag.srcObject = stream
         this.stream = stream

         stream.getTracks().forEach(track=>this.peerConnection.addTrack(track,stream))
         this.socket.emit('startLive','102030')  
                 
         this.peerConnection.createOffer().then((offer)=>{
          this.socket.on('getOffer',(data)=>{
            this.socket.emit("offer",offer)
           })
         })
      })
    }
    this.isCameraOn = !this.isCameraOn;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.thumbnailFile = file;
           
      const reader = new FileReader();
      reader.onload = (e) => {
        this.thumbnailPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.videoElement.nativeElement.muted = this.isMuted;
  }

  toggleFullscreen(): void {
    if (!document.fullscreenElement) {
      this.videoElement.nativeElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
 
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


   stopBothVideoAndAudio(stream:MediaStream) {
    stream.getTracks().forEach((track) => {
        if (track.readyState == 'live') {
            track.stop();
        }
    });
}

// stop only camera
stopVideoOnly(stream:MediaStream) {
    stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}

// stop only mic
 stopAudioOnly(stream:MediaStream) {
    stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'audio') {
            track.stop();
        }
    });
}




  createLive() {
  if(this.liveForm.valid) {
   const title =  this.liveForm.controls['title'].value
   const description = this.liveForm.controls['description'].value
   this._userService.createLive(title,description,this.thumbnailFile as File).subscribe()
   this.closeModal();
  }
  }
  
}
