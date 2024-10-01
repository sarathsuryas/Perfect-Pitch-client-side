import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavBarComponent } from './admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminService } from '../features/admin/services/admin.service';
import { AdminSideBarComponent } from './admin/static-components/admin-side-bar/admin-side-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { GoogleSigninComponent } from '../features/user/components/google-signin/google-signin.component';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from 'src/environment/environment';



@NgModule({
  declarations: [ 
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers:[
   
  ],
  exports:[ ]
})
export class CoreModule { }
