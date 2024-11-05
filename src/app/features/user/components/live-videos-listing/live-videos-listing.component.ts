import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../../services/user/user.service';
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
export class LiveVideosListingComponent {
  selectedVideo: MusicVideo | null = null;
  constructor(private sanitizer: DomSanitizer,private _userService:UserService) {}

  // videos: MusicVideo[] = [
  //   {
  //     id: 1,
  //     title: 'Summer Nights Live',
  //     artist: 'The Groove Masters',
  //     thumbnailUrl: 'https://picsum.photos/seed/video1/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 1500000,
  //     duration: '4:32'
  //   },
  //   {
  //     id: 2,
  //     title: 'Acoustic Sunset Session',
  //     artist: 'Melody & The Heartstrings',
  //     thumbnailUrl: 'https://picsum.photos/seed/video2/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 980000,
  //     duration: '3:45'
  //   },
  //   {
  //     id: 3,
  //     title: 'Electric Dreams Concert',
  //     artist: 'Neon Pulse',
  //     thumbnailUrl: 'https://picsum.photos/seed/video3/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 2100000,
  //     duration: '5:17'
  //   },
  //   {
  //     id: 4,
  //     title: 'Jazz in the Park',
  //     artist: 'Smooth Saxophones',
  //     thumbnailUrl: 'https://picsum.photos/seed/video4/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 750000,
  //     duration: '6:02'
  //   },
  //   {
  //     id: 5,
  //     title: 'Rock Arena Explosion',
  //     artist: 'Thunder Strikes',
  //     thumbnailUrl: 'https://picsum.photos/seed/video5/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 3200000,
  //     duration: '4:58'
  //   },
  //   {
  //     id: 6,
  //     title: 'Classical Nights',
  //     artist: 'Symphony of Stars',
  //     thumbnailUrl: 'https://picsum.photos/seed/video6/300/200',
  //     videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  //     views: 890000,
  //     duration: '7:21'
  //   }
  // ];

  // closeVideo(): void {
  //   this.selectedVideo = null;
  // }
  // getSafeUrl(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

 async init() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElement = document.getElementById("video") as HTMLVideoElement;
    videoElement.srcObject = stream;
    const peer = this.createPeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
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


async initView() {
  const peer = this.createPeers();
  peer.addTransceiver("video", { direction: "recvonly" })
}

createPeers() {
  const peer = new RTCPeerConnection({
      iceServers: [
          {
              urls: "stun:stun.stunprotocol.org"
          }
      ]
  });
  peer.ontrack = this.handleTrackEvent;
  peer.onnegotiationneeded = () => this.handleNegotiationNeededEvents(peer);

  return peer;
}

async handleNegotiationNeededEvents(peer:any) {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  const payload = {
      sdp: peer.localDescription
  };

  const data = await this._userService.consumer(payload) as any
  const desc = new RTCSessionDescription(data.sdp);
  peer.setRemoteDescription(desc).catch((e: Error) => console.log(e.message));

}
handleTrackEvent(e: RTCTrackEvent): void {
  const videoElement = document.getElementById("preview") as HTMLVideoElement;
  videoElement.srcObject = e.streams[0];
}

  
}
