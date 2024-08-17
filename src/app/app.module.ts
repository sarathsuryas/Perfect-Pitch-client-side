import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/user/static-components/nav-bar/nav-bar.component';
import { SideNavBarComponent } from './core/user/static-components/side-nav-bar/side-nav-bar.component';
import { UserLoginComponent } from './features/user/components/user-login/user-login.component';
import { UserRegisterComponent } from './features/user/components/user-register/user-register.component';
import { UserHomeComponent } from './features/user/components/user-home/user-home.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './core/routes/user-routing.module';
import { AdminRoutingModule } from './core/routes/admin-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { OtpComponent } from './shared/user/components/otp/otp.component';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgOtpInputModule } from 'ng-otp-input';
import { AdminLoginComponent } from './features/admin/components/admin-login/admin-login.component';
import { AdminEffects } from './store/admin/admin.effects';
import { adminReducer } from './store/admin/admin.reducer';
import { AdminNavBarComponent } from './core/admin/static-components/admin-nav-bar/admin-nav-bar.component';
import { AdminSideBarComponent } from './core/admin/static-components/admin-side-bar/admin-side-bar.component';
import { AdminMainComponent } from './features/admin/components/admin-main/admin-main.component';
import { SidebarModule } from 'primeng/sidebar';
import { UserManagementComponent } from './features/admin/components/user-management/user-management.component';
import { DialogModule } from 'primeng/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddUserComponent } from './features/admin/components/add-user/add-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EditUserComponent } from './features/admin/components/edit-user/edit-user.component';
import { UserMainComponent } from './features/user/components/user-main/user-main.component';
import { AdminAuthInterceptor } from './core/interceptors/admin-auth-interceptor/admin-auth.interceptor';
import { UserProfileComponent } from './features/user/components/user-profile/user-profile.component';
import {  EmailValidationDirective } from './shared/directives/email/email-valdation.directive';
import { FullNameValidatorDirective } from './shared/directives/fullName/full-name-validator.directive';
import { PhoneNumberValidatorDirective } from './shared/directives/phoneNumber/phone-number-validator.directive';
import { PasswordValidatorDirective } from './shared/directives/password/password-validator.directive';
import { CountdownModule } from 'ngx-countdown';
import { UserAuthInterceptor } from './core/interceptors/user-auth-interceptor/user-auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideNavBarComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserHomeComponent,
    OtpComponent,
    AdminLoginComponent,
    AdminNavBarComponent,
    AdminSideBarComponent,
    AdminMainComponent,
    UserManagementComponent,
    AddUserComponent,
    EditUserComponent,
    UserMainComponent,
    UserProfileComponent,
    EmailValidationDirective,
    FullNameValidatorDirective,
    PhoneNumberValidatorDirective,
    PasswordValidatorDirective,
  ],
  imports: [
    BrowserModule,
    NgOtpInputModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CountdownModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    ProgressSpinnerModule,
    ToastModule,
    SidebarModule,
    DialogModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    MatSlideToggleModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    StoreModule.forRoot([]),
    StoreModule.forFeature('user',userReducer),
    StoreModule.forFeature('admin',adminReducer),
    EffectsModule.forRoot([UserEffects,AdminEffects]),
  ],
  providers: [
    provideHttpClient(withFetch())
    ,CookieService,MessageService,
     provideAnimations(),
     {provide: HTTP_INTERCEPTORS, 
      useClass: AdminAuthInterceptor,
       multi: true},
       {provide:HTTP_INTERCEPTORS,
        useClass:UserAuthInterceptor,
        multi:true
       }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }


