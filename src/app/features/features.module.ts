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
    CommentRepliesComponent
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
