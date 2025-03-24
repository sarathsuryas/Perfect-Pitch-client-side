import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { map, Subject, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Store } from '@ngrx/store';
import { selectUserData } from 'src/app/store/user/user.selector';
import { LiveStreamingService } from '../../services/live-streaming/live-streaming.service';
import { iceConfiguration } from 'src/app/core/turnConfig';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environment/environment.prod';

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
  socket:Socket
  // @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  peerConnection: RTCPeerConnection | undefined;
  retryCount = 0;
  readonly MAX_RETRIES = 5;
  
  
  debugMessages: string[] = [];
  @ViewChild('live') live!: ElementRef<HTMLVideoElement>;
  constructor(
    private route: ActivatedRoute,
    private _store: Store,
    private _liveStreamingService:LiveStreamingService,
    private _userService:UserService
  ) {

    // this._store.select(selectUserData).subscribe({
    //   next: (value) => {
    //     this.subscribers = [...value?.subscribers as string[]] 
    //     this.subscriberCount = this.subscribers.length
    //     this.userId = value?._id as string
    //     if(this.subscribers.includes(this.userId)) {
    //       this.isSubscribed = true
    //     } else {
    //       this.isSubscribed = false
    //     }
    //   }
    // })
    this.socket = io(environment.apiUrl)
    
  }



  ngOnInit(): void {


    this.route.paramMap.pipe(
      map(params => params.get('uuid')),
      tap(uuid => this.uuid = uuid as string),
      switchMap(uuid => this._liveStreamingService.getLiveVideoDetails(uuid as string)),
      tap((data) => {
        this.streamTitle = data.title
        this.streamerName = data.artistData.fullName
        this.artistImage = data.artistData.profileImage
        // const peer = this.createPeer()
        // peer.addTransceiver("video", { direction: "recvonly" });
        // peer.addTransceiver("audio", { direction: "recvonly" });
        this.socket.emit("viewer_request", this.uuid); 
        this.socket.on('viewer_offer',(description)=>{
          this.setupPeerConnection(description)
        })
        
      })
    ).subscribe({
      error: (err) => {
        console.log(err)
      }
    })
  // this.uuid  = prompt() as string

  this.socket.on("viewer_ice_candidate", (candidate) => {
    if (this.peerConnection) {
        console.log("Received ICE candidate from server");
        this.peerConnection
            .addIceCandidate(new RTCIceCandidate(candidate))
            .catch((error) => {
                console.error("Error adding ICE candidate:", error);
            });
    }
});


  }
//
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

//
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


  setupPeerConnection(offer:RTCSessionDescriptionInit) {
    const configuration = {
      iceServers: [
        {
          urls: "stun:stun.relay.metered.ca:80",
        },
        {
          urls: "turn:global.relay.metered.ca:80",
          username: "3a7178428310d4e9f39ecf1f",
          credential: "R/apDit6x6FYU9QI",
        },
        {
          urls: "turn:global.relay.metered.ca:80?transport=tcp",
          username: "3a7178428310d4e9f39ecf1f",
          credential: "R/apDit6x6FYU9QI",
        },
        {
          urls: "turn:global.relay.metered.ca:443",
          username: "3a7178428310d4e9f39ecf1f",
          credential: "R/apDit6x6FYU9QI",
        },
        {
          urls: "turns:global.relay.metered.ca:443?transport=tcp",
          username: "3a7178428310d4e9f39ecf1f",
          credential: "R/apDit6x6FYU9QI",
        },
    ],
    };
  
 const remoteVideo = document.getElementById('video') as HTMLVideoElement
    this.peerConnection = new RTCPeerConnection(configuration);

    // Handle incoming tracks
    this.peerConnection.ontrack = (event) => {
        console.log(`Received track: ${event.track.kind}`);

        if (!remoteVideo.srcObject) {
            console.log("Setting new stream to video element");
            remoteVideo.srcObject = new MediaStream();
        }
      
        // Add this track to the existing stream
        const mediaStream = remoteVideo.srcObject as MediaStream;

        mediaStream.addTrack(event.track)
        console.log(
            `Video now has ${mediaStream.getTracks().length
            } tracks: ${mediaStream
                .getTracks()
                .map((t) => t.kind)
                .join(", ")}`
        );

        console.log("Connected to broadcast", "online");
    };

    // ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            this.socket.emit("viewer_ice_candidate", event.candidate);
        }
    };

    // Connection state change
    this.peerConnection.onconnectionstatechange = (event) => {
        console.log(
            `Connection state changed to: ${this.peerConnection?.connectionState}`
        );

        if (this.peerConnection?.connectionState === "connected") {
            console.log("Connected to broadcast", "online");
        } else if (
            this.peerConnection?.connectionState === "disconnected" ||
            this.peerConnection?.connectionState === "failed"
        ) {
            console.log("Broadcast connection lost", "offline");

            // Auto retry for failed connections (with limit)
            if (
                this.peerConnection.connectionState === "failed" &&
                this.retryCount < this.MAX_RETRIES
            ) {
                this.retryCount++;
                console.log(
                    `Connection failed. Retry attempt ${this.retryCount}/${this.MAX_RETRIES}`
                );
                // setTimeout(requestBroadcast, 2000);
            }
        }
    };

    // ICE connection state change
    this.peerConnection.oniceconnectionstatechange = (event) => {
        console.log(
            `ICE connection state changed to: ${this.peerConnection?.iceConnectionState}`
        );
    };

    // Set remote description (offer from server)
    this.peerConnection
        .setRemoteDescription(offer)
        .then(() => {
            console.log("Remote description set successfully, creating answer");
            return this.peerConnection?.createAnswer();
        })
        .then((answer) => {
            console.log("Answer created, setting local description");
            return this.peerConnection?.setLocalDescription(answer);
        })
        .then(() => {
            console.log("Local description set, sending answer to server");
            this.socket.emit("viewer_answer", this.peerConnection?.localDescription);
        })
        .catch((error) => {
            console.error("Error setting up peer connection:", error);
            console.log(`Connection error: ${error.message}`);
            console.log(`Connection error: ${error.message}`, "offline");
        });
}


 

  

  sendMessage(message: string): void {
    console.log('Sending message:', message);
  }
  ngOnDestroy(): void {
    
    // this._socketService.disconnect()
  }

}

