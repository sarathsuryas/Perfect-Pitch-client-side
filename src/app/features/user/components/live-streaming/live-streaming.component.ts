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
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  /// new added
  socket: Socket;
  peerConnection: RTCPeerConnection | undefined;
  retryCount = 0;
  readonly MAX_RETRIES = 5;
  
  statusMessage = 'Status: No broadcast available';
  statusClass = 'offline';
  
  debugMessages: string[] = [];
  @ViewChild('live') live!: ElementRef<HTMLVideoElement>;
  constructor(
    private route: ActivatedRoute,
    private _socketService: SocketService,
    private _store: Store,
    private _liveStreamingService:LiveStreamingService,
    private _userService:UserService
  ) {

    this.socket = io('https://perfet-pitch-service.site');
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
      })
    ).subscribe({
      error: (err) => {
        console.log(err)
      }
    })
    this.socket.on('connect', () => {
      this.logDebug('Connected to server');
      this.requestBroadcast();
    });

    this.socket.on('broadcaster_connected', () => {
      this.logDebug('Broadcaster available. Connecting...');
      this.updateStatus('Broadcaster available. Connecting...', 'waiting');
      this.requestBroadcast();
    });

    this.socket.on('broadcaster_disconnected', () => {
      this.logDebug('Broadcaster disconnected');
      this.updateStatus('Broadcaster disconnected', 'offline');
      this.closeConnection();
    });

    this.socket.on('no_broadcaster', () => {
      this.logDebug('No broadcaster available');
      this.updateStatus('No broadcast available. Waiting for broadcaster...', 'waiting');
    });

    this.socket.on('viewer_offer', (description) => {
      this.logDebug('Received offer from server');
      this.setupPeerConnection(description);
    });

    this.socket.on('viewer_ice_candidate', (candidate) => {
      if (this.peerConnection) {
        this.logDebug('Received ICE candidate from server');
        this.peerConnection
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((error) => {
            console.error('Error adding ICE candidate:', error);
            this.logDebug(`Error adding ICE candidate: ${error.message}`);
          });
      }
    });

    this.socket.on('error', (data) => {
      this.logDebug(`Server error: ${data.message}`);
      this.updateStatus(`Error: ${data.message}`, 'offline');
    });
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



  

  sendMessage(message: string): void {
    console.log('Sending message:', message);
  }
  ngOnDestroy(): void {
    this._socketService.disconnect()
  }
  refreshConnection() {
    this.logDebug('Manually refreshing connection');
    this.closeConnection();
    this.requestBroadcast();
  }

  requestBroadcast() {
    this.updateStatus('Connecting to broadcast...', 'waiting');
    this.socket.emit('viewer_request');
  }

  closeConnection() {
    if (this.peerConnection) {
      this.logDebug('Closing existing peer connection');
      this.peerConnection.close();
      this.peerConnection = undefined;
    }

    const videoElement = this.remoteVideo?.nativeElement;
    if (videoElement && videoElement.srcObject) {
      this.logDebug('Stopping all tracks in remote video');
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
    }
  }

  setupPeerConnection(offer: RTCSessionDescriptionInit) {
    const configuration = {
      iceServers: [{   urls: [ "stun:bn-turn2.xirsys.com" ]}, {   username: "o8_s2lbVKiqxpNa5Ntw5kG_h7g9zYj-AbK49RHWtnH26b_exoUgSkD5MrvzAQkpMAAAAAGcrwiBzYXJhdGhz",   credential: "90886c3c-9c74-11ef-8e6e-0242ac140004",   urls: [       "turn:bn-turn2.xirsys.com:80?transport=udp",       "turn:bn-turn2.xirsys.com:3478?transport=udp",       "turn:bn-turn2.xirsys.com:80?transport=tcp",       "turn:bn-turn2.xirsys.com:3478?transport=tcp",       "turns:bn-turn2.xirsys.com:443?transport=tcp",       "turns:bn-turn2.xirsys.com:5349?transport=tcp"   ]}]
    };

    // Close any existing connection
    this.closeConnection();

    this.logDebug('Setting up new peer connection');
    this.peerConnection = new RTCPeerConnection(configuration);

    // Handle incoming tracks
    this.peerConnection.ontrack = (event) => {
      this.logDebug(`Received track: ${event.track.kind}`);
      
      const videoElement = this.remoteVideo.nativeElement;
      if (!videoElement.srcObject) {
        this.logDebug('Setting new stream to video element');
        videoElement.srcObject = new MediaStream();
      }

      // Add this track to the existing stream
      (videoElement.srcObject as MediaStream).addTrack(event.track);
      
      const trackCount = (videoElement.srcObject as MediaStream).getTracks().length;
      const trackTypes = (videoElement.srcObject as MediaStream).getTracks().map(t => t.kind).join(', ');
      this.logDebug(`Video now has ${trackCount} tracks: ${trackTypes}`);

      this.updateStatus('Connected to broadcast', 'online');
    };

    // ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('viewer_ice_candidate', event.candidate);
      }
    };

    // Connection state change
    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection) {
        this.logDebug(`Connection state changed to: ${this.peerConnection.connectionState}`);

        if (this.peerConnection.connectionState === 'connected') {
          this.updateStatus('Connected to broadcast', 'online');
        } else if (
          this.peerConnection.connectionState === 'disconnected' ||
          this.peerConnection.connectionState === 'failed'
        ) {
          this.updateStatus('Broadcast connection lost', 'offline');

          // Auto retry for failed connections (with limit)
          if (
            this.peerConnection.connectionState === 'failed' &&
            this.retryCount < this.MAX_RETRIES
          ) {
            this.retryCount++;
            this.logDebug(`Connection failed. Retry attempt ${this.retryCount}/${this.MAX_RETRIES}`);
            setTimeout(() => this.requestBroadcast(), 2000);
          }
        }
      }
    };

    // ICE connection state change
    this.peerConnection.oniceconnectionstatechange = () => {
      if (this.peerConnection) {
        this.logDebug(`ICE connection state changed to: ${this.peerConnection.iceConnectionState}`);
      }
    };

    // Set remote description (offer from server)
    this.peerConnection
      .setRemoteDescription(offer)
      .then(() => {
        this.logDebug('Remote description set successfully, creating answer');
        if (this.peerConnection) {
          return this.peerConnection.createAnswer();
        }
        return Promise.reject('Peer connection not available');
      })
      .then((answer) => {
        this.logDebug('Answer created, setting local description');
        if (this.peerConnection) {
          return this.peerConnection.setLocalDescription(answer);
        }
        return Promise.reject('Peer connection not available');
      })
      .then(() => {
        this.logDebug('Local description set, sending answer to server');
        if (this.peerConnection && this.peerConnection.localDescription) {
          this.socket.emit('viewer_answer', this.peerConnection.localDescription);
        }
      })
      .catch((error) => {
        console.error('Error setting up peer connection:', error);
        this.logDebug(`Connection error: ${error.message}`);
        this.updateStatus(`Connection error: ${error.message}`, 'offline');
      });
  }

  updateStatus(message: string, className: string) {
    this.statusMessage = `Status: ${message}`;
    this.statusClass = className;
  }

  logDebug(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.debugMessages.push(`[${timestamp}] ${message}`);
    console.log(message);
  }



}
