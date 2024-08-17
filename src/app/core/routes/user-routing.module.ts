import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from 'src/app/features/user/components/user-home/user-home.component';
import { UserLoginComponent } from 'src/app/features/user/components/user-login/user-login.component';
import { UserRegisterComponent } from 'src/app/features/user/components/user-register/user-register.component';
import { OtpComponent } from 'src/app/shared/user/components/otp/otp.component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
