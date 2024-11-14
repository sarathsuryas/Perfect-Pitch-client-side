import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './features/admin/components/admin-login/admin-login.component';
import { AdminMainComponent } from './features/admin/components/admin-main/admin-main.component';
import { AdminAuthGuard } from './core/admin/guards/admin-auth.guard';
import { UserManagementComponent } from './features/admin/components/user-management/user-management.component';
import { UserLoginComponent } from './features/user/components/user-login/user-login.component';
import { UserRegisterComponent } from './features/user/components/user-register/user-register.component';
import { OtpComponent } from './shared/user/components/otp/otp.component';
import { UserHomeComponent } from './features/user/components/user-home/user-home.component';
import { UserMainComponent } from './features/user/components/user-main/user-main.component';
import { UserAuthGuard } from './core/user/guards/user-auth.guard';
import { AdminResetPasswordComponent } from './features/admin/components/admin-reset-password/admin-reset-password.component';
import { AdminResetPasswordFormComponent } from './features/admin/components/admin-reset-password-form/admin-reset-password-form.component';
import { UserForgotPasswordComponent } from './features/user/components/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordFormComponent } from './features/user/components/user-reset-password-form/user-reset-password-form.component';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import { VideosListComponent } from './features/user/components/videos-list/videos-list.component';
import { UploadAudioComponent } from './features/user/components/upload-audio/upload-audio.component';
import { SingleAudioUploadComponent } from './features/user/components/single-audio-upload/single-audio-upload.component';
import { MultipleAudioUploadComponent } from './features/user/components/multiple-audio-upload/multiple-audio-upload.component';
import { AlbumListComponent } from './features/user/components/album-list/album-list.component';
import { AlbumSongsListComponent } from './features/user/components/album-songs-list/album-songs-list.component';
import { VideoPlayComponent } from './features/user/components/video-play/video-play.component';
import { ShortsComponent } from './features/user/components/shorts/shorts.component';
import { ShortsUploadComponent } from './features/user/components/shorts-upload/shorts-upload.component';
import { MusicPlaylistComponent } from './features/user/components/music-playlist/music-playlist.component';
import { ViewPlaylistComponent } from './features/user/components/view-playlist/view-playlist.component';
import { TestComponent } from './features/user/components/test/test.component';
import { MusicGenresComponent } from './features/user/components/music-genres/music-genres.component';
import { AddGenresComponent } from './features/admin/components/add-genres/add-genres.component';
import { GlobalAudioPlayerComponent } from './features/user/components/global-audio-player/global-audio-player.component';
import { SongsListComponent } from './features/user/components/songs-list/songs-list.component';
import { ArtistListingComponent } from './features/user/components/artist-listing/artist-listing.component';
import { ArtistMediasComponent } from './features/user/components/artist-medias/artist-medias.component';
import { TestnavComponent } from './features/user/components/testnav/testnav.component';
import { NgxAudioComponent } from './features/user/components/ngx-audio/ngx-audio.component';
import { CreateLiveComponent } from './features/user/components/create-live/create-live.component';
import { LiveStreamingComponent } from './features/user/components/live-streaming/live-streaming.component';
import { MembershipComponent } from './features/user/components/membership/membership.component';
import { PaymentSuccessComponent } from './features/user/components/payment-success/payment-success.component';
import { MembershipManagementComponent } from './features/admin/components/membership-management/membership-management.component';
import { memberShipGuard } from './core/user/guards/member-ship.guard';
import { LiveVideosListingComponent } from './features/user/components/live-videos-listing/live-videos-listing.component';
import { LiveVideoPageComponent } from './features/user/components/live-video-page/live-video-page.component';
import { UserBlockedComponent } from './features/user/components/user-blocked/user-blocked.component';
import { LivePreviewComponent } from './features/user/components/live-preview/live-preview.component';

const routes: Routes = [
  { path:'',redirectTo:'login' , pathMatch: 'full'},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'otp-verify',component:OtpComponent},
  {path:'test-nav',component:TestnavComponent},
  {path:'user-blocked',component:UserBlockedComponent},
  {path:'home',component:UserMainComponent, canActivate:[UserAuthGuard],
    children:[
      {path:'user-profile',component:UserProfileComponent,canActivate:[UserAuthGuard]},
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
      {path:'live-video',component:LiveVideoPageComponent},
      {path:'membership',component:MembershipComponent},
      {path:'payment-success',component:PaymentSuccessComponent}
    ]
  },
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/request-reset-password',component:AdminResetPasswordComponent},
  {path:'admin/reset-password-form/:token',component:AdminResetPasswordFormComponent},
  {path:'request-reset-password',component:UserForgotPasswordComponent},
  {path:'reset-password-form/:token',component:UserResetPasswordFormComponent},
  {path:'admin/home',component:AdminMainComponent,canActivate:[AdminAuthGuard],
  children:[
    {path:'user-management',component:UserManagementComponent},
    {path:'add-genres',component:AddGenresComponent},
    {path:'list-memberships',component:MembershipManagementComponent}
  ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
