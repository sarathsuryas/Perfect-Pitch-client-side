import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from 'src/app/features/admin/components/admin-login/admin-login.component';
import { AdminNavBarComponent } from '../admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminMainComponent } from 'src/app/features/admin/components/admin-main/admin-main.component';
import { UserManagementComponent } from 'src/app/features/admin/components/user-management/user-management.component';
import { AdminAuthGuard } from '../admin/guards/admin-auth.guard';
import { AddGenresComponent } from 'src/app/features/admin/components/add-genres/add-genres.component';
import { AdminResetPasswordFormComponent } from 'src/app/features/admin/components/admin-reset-password-form/admin-reset-password-form.component';
import { AdminResetPasswordComponent } from 'src/app/features/admin/components/admin-reset-password/admin-reset-password.component';
import { MembershipManagementComponent } from 'src/app/features/admin/components/membership-management/membership-management.component';
import { UserForgotPasswordComponent } from 'src/app/features/user/components/user-forgot-password/user-forgot-password.component';
import { UserResetPasswordFormComponent } from 'src/app/features/user/components/user-reset-password-form/user-reset-password-form.component';

const routes: Routes = [
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
export class AdminRoutingModule { }
