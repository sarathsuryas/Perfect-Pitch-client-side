import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from 'src/app/features/user/components/user-home/user-home.component';
import { UserLoginComponent } from 'src/app/features/user/components/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/features/user/components/user-register/user-register.component';
import { OtpComponent } from 'src/app/features/user/components/otp/otp.component';
import { AlbumListComponent } from 'src/app/features/user/components/album-list/album-list.component';
import { AlbumSongsListComponent } from 'src/app/features/user/components/album-songs-list/album-songs-list.component';
import { ArtistListingComponent } from 'src/app/features/user/components/artist-listing/artist-listing.component';
import { ArtistMediasComponent } from 'src/app/features/user/components/artist-medias/artist-medias.component';
import { GlobalAudioPlayerComponent } from 'src/app/features/user/components/global-audio-player/global-audio-player.component';
import { LiveChatComponent } from 'src/app/features/user/components/live-chat/live-chat.component';
import { LivePreviewComponent } from 'src/app/features/user/components/live-preview/live-preview.component';
import { LiveStreamingComponent } from 'src/app/features/user/components/live-streaming/live-streaming.component';
import { LiveVideosListingComponent } from 'src/app/features/user/components/live-videos-listing/live-videos-listing.component';
import { MembershipComponent } from 'src/app/features/user/components/membership/membership.component';
import { MultipleAudioUploadComponent } from 'src/app/features/user/components/multiple-audio-upload/multiple-audio-upload.component';
import { MusicGenresComponent } from 'src/app/features/user/components/music-genres/music-genres.component';
import { MusicPlaylistComponent } from 'src/app/features/user/components/music-playlist/music-playlist.component';
import { NgxAudioComponent } from 'src/app/features/user/components/ngx-audio/ngx-audio.component';
import { PaymentSuccessComponent } from 'src/app/features/user/components/payment-success/payment-success.component';
import { ShortsUploadComponent } from 'src/app/features/user/components/shorts-upload/shorts-upload.component';
import { ShortsComponent } from 'src/app/features/user/components/shorts/shorts.component';
import { SingleAudioUploadComponent } from 'src/app/features/user/components/single-audio-upload/single-audio-upload.component';
import { SongsListComponent } from 'src/app/features/user/components/songs-list/songs-list.component';
import { TestComponent } from 'src/app/features/user/components/test/test.component';
import { TestnavComponent } from 'src/app/features/user/components/testnav/testnav.component';
import { UploadAudioComponent } from 'src/app/features/user/components/upload-audio/upload-audio.component';
import { UserBlockedComponent } from 'src/app/features/user/components/user-blocked/user-blocked.component';
import { UserMainComponent } from 'src/app/features/user/components/user-main/user-main.component';
import { UserProfileComponent } from 'src/app/features/user/components/user-profile/user-profile.component';
import { VideoPlayComponent } from 'src/app/features/user/components/video-play/video-play.component';
import { VideosListComponent } from 'src/app/features/user/components/videos-list/videos-list.component';
import { ViewPlaylistComponent } from 'src/app/features/user/components/view-playlist/view-playlist.component';
import { memberShipGuard } from '../user/guards/member-ship.guard';
import { UserAuthGuard } from '../user/guards/user-auth.guard';
import { UploadVideoComponent } from 'src/app/features/user/components/upload-video/upload-video.component';
import { PagenotfoundComponent } from 'src/app/shared/components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path:'',redirectTo:'login' , pathMatch: 'full'},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'otp-verify',component:OtpComponent},
  {path:'test-nav',component:TestnavComponent},
  {path:'user-blocked',component:UserBlockedComponent},
  {path:'home',component:UserMainComponent, canActivate:[UserAuthGuard],
    children:[
      {path:'user-profile',component:UserProfileComponent},
      {path:'music-videos',component:VideosListComponent},
      {path:'upload-audio',component:UploadAudioComponent},
      {path:"single-audio-upload",component:SingleAudioUploadComponent,canActivate:[memberShipGuard]},
      {path:"multiple-audio-upload",component:MultipleAudioUploadComponent,canActivate:[memberShipGuard]},
      {path:'albums',component:AlbumListComponent},
      {path:"landing",component:UserHomeComponent},
      {path:"album-songs/:id",component:AlbumSongsListComponent},
      {path:"play-video/:id",component:VideoPlayComponent},
      {path:'shorts',component:ShortsComponent},
      {path:'shorts-upload',component:ShortsUploadComponent},
      {path:'music-playlist',component:MusicPlaylistComponent},
      {path:'view-playlist/:id',component:ViewPlaylistComponent},
      {path:'test',component:TestComponent},
      {path:'genres',component:MusicGenresComponent},
      {path:'audio',component:GlobalAudioPlayerComponent},
      {path:'songs-list/:id',component:SongsListComponent},
      {path:'artist-list',component:ArtistListingComponent},
      {path:'artist-medias/:id',component:ArtistMediasComponent},
      {path:'ngx',component:NgxAudioComponent},
      {path:'create-live',component:LivePreviewComponent,canActivate:[memberShipGuard]},
      {path:'live',component:LiveVideosListingComponent},
      {path:'live-video/:uuid',component:LiveStreamingComponent},
      {path:'membership',component:MembershipComponent},
      {path:'payment-success',component:PaymentSuccessComponent},
      {path:'chat',component:LiveChatComponent},
      {path:'upload-video',component:UploadVideoComponent,canActivate:[memberShipGuard]},
      { path: '**', pathMatch: 'full',  
        component: PagenotfoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
