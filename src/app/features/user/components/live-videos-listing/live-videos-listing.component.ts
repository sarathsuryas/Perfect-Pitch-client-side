import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
import { ILiveStreams } from 'src/app/core/interfaces/ILiveStreams';
interface MusicVideo {
  id: number;
  title: string;
  artist: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  duration: string;
}

@Component({
  selector: 'app-live-videos-listing',
  templateUrl: './live-videos-listing.component.html',
  styleUrls: ['./live-videos-listing.component.css']
})
export class LiveVideosListingComponent implements OnInit {
  selectedVideo: MusicVideo | null = null;
videos:ILiveStreams[] = [];

  constructor(private _userService:UserService) {}
  ngOnInit(): void {
    this._userService.getStreamings().subscribe({
      next:(value)=>{
      this.videos = value
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  



// async initView() {
//   const peer = this.createPeers();
//   peer.addTransceiver("video", { direction: "recvonly" })
// }

// createPeers() {
//   const peer = new RTCPeerConnection({
//       iceServers: [
//           {
//               urls: "stun:stun.stunprotocol.org"
//           }
//       ]
//   });
//   peer.ontrack = this.handleTrackEvent;
//   peer.onnegotiationneeded = () => this.handleNegotiationNeededEvents(peer);

//   return peer;
// }

// async handleNegotiationNeededEvents(peer:any) {
//   const offer = await peer.createOffer();
//   await peer.setLocalDescription(offer);
//   const payload = {
//       sdp: peer.localDescription
//   };

//   const data = await this._userService.consumer(payload) as any
//   const desc = new RTCSessionDescription(data.sdp);
//   peer.setRemoteDescription(desc).catch((e: Error) => console.log(e.message));

// }
// handleTrackEvent(e: RTCTrackEvent): void {
//   const videoElement = document.getElementById("preview") as HTMLVideoElement;
//   videoElement.srcObject = e.streams[0];
// }

  
}
