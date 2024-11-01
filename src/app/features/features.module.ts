import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavBarComponent } from '../core/admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from '../core/admin/static-components/admin-side-bar/admin-side-bar.component';
import { AdminMainComponent } from './admin/components/admin-main/admin-main.component';
import { UserManagementComponent } from './admin/components/user-management/user-management.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastModule } from 'primeng/toast';
import { MatTableModule } from '@angular/material/table';
import { UserLoginComponent } from './user/components/user-login/user-login.component';
import { UserRegisterComponent } from './user/components/user-register/user-register.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { MultipleAudioUploadComponent } from './user/components/multiple-audio-upload/multiple-audio-upload.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminResetPasswordComponent } from './admin/components/admin-reset-password/admin-reset-password.component';
import { AdminResetPasswordFormComponent } from './admin/components/admin-reset-password-form/admin-reset-password-form.component';
import { EditUserComponent } from './admin/components/edit-user/edit-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlbumCardComponent } from './user/components/album-card/album-card.component';
import { RouterModule } from '@angular/router';
import { AlbumListComponent } from './user/components/album-list/album-list.component';
import { AlbumSongsListComponent } from './user/components/album-songs-list/album-songs-list.component';
import {  NgxAudioPlayerModule } from '@khajegan/ngx-audio-player';
import { AudioPlayerComponent } from './user/components/audio-player/audio-player.component';
import { AudioUploadDialogComponent } from './user/components/audio-upload-dialog/audio-upload-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { CommentComponent } from './user/components/comment/comment.component';
import { VideoPlayComponent } from './user/components/video-play/video-play.component';
import { VideoPlayerComponent } from './user/components/video-player/video-player.component';
import { VideoCardComponent } from './user/components/video-card/video-card.component';
import { VideosListComponent } from './user/components/videos-list/videos-list.component';
import { UserMainComponent } from './user/components/user-main/user-main.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { UserForgotPasswordComponent } from './user/components/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordFormComponent } from './user/components/user-reset-password-form/user-reset-password-form.component';
import { EditProfileComponent } from './user/components/edit-profile/edit-profile.component';
import { OldPasswordComponent } from './user/components/old-password/old-password.component';
import { ResetPasswordComponent } from './user/components/reset-password/reset-password.component';
import { UploadVideoComponent } from './user/components/upload-video/upload-video.component';
import { UploadAudioComponent } from './user/components/upload-audio/upload-audio.component';
import { SingleAudioUploadComponent } from './user/components/single-audio-upload/single-audio-upload.component';
import { MatStepperModule } from '@angular/material/stepper';
import { UserHomeComponent } from './user/components/user-home/user-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider, SocialAuthServiceConfig} from '@abacritt/angularx-social-login';
import { environment } from 'src/environment/environment';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleSigninComponent } from './user/components/google-signin/google-signin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommentSectionComponent } from './user/components/comment-section/comment-section.component';
import { CommentRepliesComponent } from './user/components/comment-replies/comment-replies.component';
import { ShortsPlayerComponent } from './user/components/shorts-player/shorts-player.component';
import { ShortsComponent } from './user/components/shorts/shorts.component';
import { ShortsUploadComponent } from './user/components/shorts-upload/shorts-upload.component';
import { TrimSliderComponent } from './user/components/trim-slider/trim-slider.component';
import { MusicPlaylistComponent } from './user/components/music-playlist/music-playlist.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlaylistCardsComponent } from './user/components/playlist-cards/playlist-cards.component';
import { ViewPlaylistComponent } from './user/components/view-playlist/view-playlist.component';
import {  PlaylistDialogComponent } from './user/components/playlist-dialougue/playlist-dialougue.component';
import { CreatePlaylistDialogComponent } from './user/components/create-playlist-dialog/create-playlist-dialog.component';
import {  MatSelectModule } from '@angular/material/select';
import { TestComponent } from './user/components/test/test.component';
import { MatCardModule } from '@angular/material/card';
import { SnackbarComponent } from './user/components/snackbar/snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MusicGenresComponent } from './user/components/music-genres/music-genres.component';
import { AddGenresComponent } from './admin/components/add-genres/add-genres.component';
import { FirstLetterToUpperCasePipe } from '../core/pipes/first-letter-to-upper-case.pipe';
import { PlyrModule } from '@atom-platform/ngx-plyr';
import { GlobalAudioPlayerComponent } from './user/components/global-audio-player/global-audio-player.component';
import { SongsListComponent } from './user/components/songs-list/songs-list.component';
import { ArtistListingComponent } from './user/components/artist-listing/artist-listing.component';
import { ArtistCardsComponent } from './user/components/artist-cards/artist-cards.component';
import { ArtistMediasComponent } from './user/components/artist-medias/artist-medias.component';
import { TestnavComponent } from './user/components/testnav/testnav.component';
import { TracksUploadListsComponent } from './user/components/tracks-upload-lists/tracks-upload-lists.component';
import { NgxAudioComponent } from './user/components/ngx-audio/ngx-audio.component';
import { CreateLiveComponent } from './user/components/create-live/create-live.component';
import {WebcamModule} from 'ngx-webcam';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LiveStreamingComponent } from './user/components/live-streaming/live-streaming.component';
import { ReplyToReplyComponent } from './user/components/reply-to-reply/reply-to-reply.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LucideAngularModule, Home, Search, Library, PlusCircle, Heart, Mic2, PlayCircle } from 'lucide-angular';
import { FilterPipe } from '../core/pipes/filter.pipe';
import { MembershipComponent } from './user/components/membership/membership.component';
import { PaymentSuccessComponent } from './user/components/payment-success/payment-success.component';
import { MembershipManagementComponent } from './admin/components/membership-management/membership-management.component';
import { AddMembershipComponent } from './admin/components/add-membership/add-membership.component';
import { MembershipCardsComponent } from './user/components/membership-cards/membership-cards.component';


const config: SocketIoConfig = { url: environment.apiUrl, options: {} };



@NgModule({
  declarations: [
    AdminNavBarComponent,
    AdminSideBarComponent, 
    AdminMainComponent,
    UserManagementComponent,
    UserLoginComponent, 
    UserRegisterComponent,
    UserProfileComponent,
    MultipleAudioUploadComponent,
    AdminLoginComponent,
    AdminResetPasswordComponent,
    AdminResetPasswordFormComponent,
    EditUserComponent,
    AlbumCardComponent,
    AlbumListComponent,
    AlbumSongsListComponent,
    AudioPlayerComponent,
    AudioUploadDialogComponent,
    CommentComponent,
    VideoPlayComponent,
    VideoPlayerComponent,
    VideoCardComponent,
    VideosListComponent,
    UserForgotPasswordComponent,
    UserResetPasswordFormComponent,
    EditProfileComponent,
    MultipleAudioUploadComponent,
    OldPasswordComponent,
    ResetPasswordComponent,
    UploadVideoComponent,
    UploadAudioComponent,
    SingleAudioUploadComponent,
    UserHomeComponent,
    UserMainComponent,
    GoogleSigninComponent,
    CommentSectionComponent,
    CommentRepliesComponent,
    ShortsPlayerComponent,
    ShortsComponent,
    ShortsUploadComponent,
    TrimSliderComponent,
    MusicPlaylistComponent,
    PlaylistCardsComponent,
    ViewPlaylistComponent,
    PlaylistDialogComponent,
    CreatePlaylistDialogComponent,
    TestComponent,
    SnackbarComponent,
    MusicGenresComponent,
    AddGenresComponent,
    FirstLetterToUpperCasePipe,
    GlobalAudioPlayerComponent,
    SongsListComponent,
    ArtistListingComponent,
    ArtistCardsComponent,
    ArtistMediasComponent,
    TestnavComponent,
    TracksUploadListsComponent,
    NgxAudioComponent,
    CreateLiveComponent,
    LiveStreamingComponent,
    ReplyToReplyComponent,
    FilterPipe,
    MembershipComponent,
    PaymentSuccessComponent,
    MembershipManagementComponent,
    AddMembershipComponent,
    MembershipCardsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    NgxAudioPlayerModule,
    MatRadioModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatStepperModule,
    MatSidenavModule,  
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    PlyrModule,
    NgxAudioPlayerModule,
    WebcamModule, 
    MatGridListModule,
    AngularSvgIconModule,
    LucideAngularModule.pick({ Home, Search, Library, PlusCircle, Heart, Mic2, PlayCircle }),
    SocketIoModule.forRoot(config),
  ],
  providers:[ 
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.clientId, {
              scopes: 'openid profile email',
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  exports:[
    ToastModule,
  ]
})
export class FeaturesModule { }
