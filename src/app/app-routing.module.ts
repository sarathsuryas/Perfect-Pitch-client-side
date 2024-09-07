import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from './core/routes/user-routing.module';
import { AdminRoutingModule } from './core/routes/admin-routing.module';
import { AdminLoginComponent } from './features/admin/components/admin-login/admin-login.component';
import { AdminMainComponent } from './features/admin/components/admin-main/admin-main.component';
import { AdminAuthGuard } from './core/admin/guards/admin-auth.guard';
import { UserManagementComponent } from './features/admin/components/user-management/user-management.component';
import { UserLoginComponent } from './features/user/components/user-login/user-login.component';
import { UserRegisterComponent } from './features/user/components/user-register/user-register.component';
import { OtpComponent } from './shared/user/components/otp/otp.component';
import { UserHomeComponent } from './features/user/components/user-home/user-home.component';
import { NavBarComponent } from './core/user/static-components/nav-bar/nav-bar.component';
import { UserMainComponent } from './features/user/components/user-main/user-main.component';
import { UserAuthGuard } from './core/user/guards/user-auth.guard';
import { AdminResetPasswordComponent } from './features/admin/components/admin-reset-password/admin-reset-password.component';
import { AdminResetPasswordFormComponent } from './features/admin/components/admin-reset-password-form/admin-reset-password-form.component';
import { UserForgotPasswordComponent } from './features/user/components/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordFormComponent } from './features/user/components/user-reset-password-form/user-reset-password-form.component';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import { UploadVideoComponent } from './features/user/components/upload-video/upload-video.component';

const routes: Routes = [
  { path:'',redirectTo:'login' , pathMatch: 'full'},
  {path:'login',component:UserLoginComponent},
  {path:'register',component:UserRegisterComponent},
  {path:'otp-verify',component:OtpComponent},
  {path:'home',component:UserMainComponent,canActivate:[UserAuthGuard],
    children:[
      {path:'user-profile',component:UserProfileComponent}
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
