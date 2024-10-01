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

const routes: Routes = [
  { path:'',redirectTo:'login' , pathMatch: 'full'},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'otp-verify',component:OtpComponent},
  {path:'home',component:UserMainComponent,canActivate:[UserAuthGuard],
    children:[
      {path:'user-profile',component:UserProfileComponent},
      {path:'music-videos',component:VideosListComponent},
      {path:'upload-audio',component:UploadAudioComponent},
      {path:"single-audio-upload",component:SingleAudioUploadComponent},
      {path:"multiple-audio-upload",component:MultipleAudioUploadComponent},
      {path:'albums',component:AlbumListComponent},
      {path:"landing",component:UserHomeComponent},
      {path:"album-songs/:id",component:AlbumSongsListComponent},
      {path:"play-video/:id",component:VideoPlayComponent}
    ]
  },
  {path:'admin',component:AdminLoginComponent},
  {path:'admin/request-reset-password',component:AdminResetPasswordComponent},
  {path:'admin/reset-password-form/:token',component:AdminResetPasswordFormComponent},
  {path:'request-reset-password',component:UserForgotPasswordComponent},
  {path:'reset-password-form/:token',component:UserResetPasswordFormComponent},
  {path:'admin/home',component:AdminMainComponent,canActivate:[AdminAuthGuard],
  children:[
    {path:'user-management',component:UserManagementComponent}
  ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
