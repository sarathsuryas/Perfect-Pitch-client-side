import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { map, Subject, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.css']
})
export class LiveStreamingComponent implements OnDestroy {
  public uuid: string = ''
  isSubscribed!: boolean;
  streamTitle: string = '';
  streamerName: string = '';
  viewerCount: number = 1234;
  subscriberCount: number = 0;
  likeCount: number = 5678;
  subscribers: string[] = []
  userId: string = ''
  public artistImage!:string
  @ViewChild('live') live!: ElementRef<HTMLVideoElement>;
  constructor(
    private route: ActivatedRoute,
    private _socketService: SocketService,
    private _userService: UserService,
    private _store: Store
  ) {
    this._store.select(selectUserData).subscribe({
      next: (value) => {
        this.subscribers = [...value?.subscribers as string[]] 
        this.subscriberCount = this.subscribers.length
        this.userId = value?._id as string
        if(this.subscribers.includes(this.userId)) {
          this.isSubscribed = true
        } else {
          this.isSubscribed = false
        }
      }
    })
  }



  ngOnInit(): void {
    this._socketService.connect()
    this.route.paramMap.pipe(
      map(params => params.get('uuid')),
      tap(uuid => this.uuid = uuid as string),
      switchMap(uuid => this._userService.getLiveVideoDetails(uuid as string)),
      tap((data) => {
        this.streamTitle = data.title
        this.streamerName = data.artistData.fullName
        this.artistImage = data.artistData.profileImage
        const peer = this.createPeer()
        peer.addTransceiver("video", { direction: "recvonly" });
        peer.addTransceiver("audio", { direction: "recvonly" });
      })
    ).subscribe({
      error: (err) => {
        console.log(err)
      }
    })

  }

  toggleSubscribe() {
    if (this.isSubscribed) {
      const index = this.subscribers.findIndex((v) => v === this.userId)
      this.subscribers.splice(index, 1)
      this.isSubscribed = false
      this.subscriberCount--
      this._userService.subscribeUser(this.userId).subscribe()
    } else {
       this.subscribers.push(this.userId)
      this.isSubscribed = true
      this.subscriberCount++
      this._userService.subscribeUser(this.userId).subscribe()
    }
  }


  copyCurrentUrl(): void {
    const currentUrl = window.location.href; 
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        console.log('URL copied to clipboard:', currentUrl);
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy URL:', err);
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


  async handleNegotiationNeededEvent(peer: RTCPeerConnection) {
    const offer = await peer.createOffer()
    await peer.setLocalDescription(offer)
    const payload = {
      sdp: peer.localDescription,
      key: this.uuid
    };
    this._socketService.watchLive(payload)
    this._socketService.on().subscribe({
      next: (payload: any) => {
        const desc = new RTCSessionDescription(payload.sdp);
        peer.setRemoteDescription(desc).catch(e => console.log(e));
      },
      error: (err) => {
        console.error(err)
      }
    })

  }


  handleTrackEvent(event: any) {
    const videoElement = document.getElementById('video') as HTMLVideoElement
    videoElement.srcObject = event.streams[0]
  }


  sendMessage(message: string): void {
    console.log('Sending message:', message);
  }
  ngOnDestroy(): void {
    this._socketService.disconnect()
  }
}
