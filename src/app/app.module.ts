import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './core/routes/user-routing.module';
import { AdminRoutingModule } from './core/routes/admin-routing.module';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import { MessageService, SharedModule } from 'primeng/api';
import { AdminEffects } from './store/admin/admin.effects';
import { adminReducer } from './store/admin/admin.reducer';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddUserComponent } from './features/admin/components/add-user/add-user.component';
import { AdminAuthInterceptor } from './core/interceptors/admin-auth-interceptor/admin-auth.interceptor';
import { EmailValidationDirective } from './shared/directives/email/email-valdation.directive';
import { AlphabetValidatorDirective } from './shared/directives/alphabet/alphabet-validator.directive';
import { NumberValidatorDirective } from './shared/directives/number/number-validator.directive';
import { PasswordValidatorDirective } from './shared/directives/password/password-validator.directive';
import { InputTextModule } from 'primeng/inputtext';
import { UserAuthInterceptor } from './core/interceptors/user-auth-interceptor/user-auth.interceptor';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { membershipReducer } from './store/memberShip/membership.reducer';
import { searchReducer } from './store/search/search.reducer';
import { ToastModule } from 'primeng/toast';
import { CookieModule } from 'ngx-cookie';
  

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
  ],
  imports: [ 
    BrowserModule,
    CoreModule,
    FeaturesModule,
    SharedModule,
    BrowserAnimationsModule, 
    UserRoutingModule,
    AdminRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule,
    FormsModule, 
    RouterModule,
    ButtonModule,
    ProgressSpinnerModule,
    SidebarModule,
    DialogModule,
    AppRoutingModule,
    MatSlideToggleModule,
    ToastModule,
    InputTextModule,
    MatCardModule,
    StoreModule.forRoot([]),
    StoreModule.forFeature('user', userReducer),
    StoreModule.forFeature('admin', adminReducer),
    StoreModule.forFeature( 'membership', membershipReducer),
    StoreModule.forFeature('search',searchReducer),
    EffectsModule.forRoot([UserEffects, AdminEffects]),
    GoogleSigninButtonModule, 
    CookieModule.withOptions() 
  ],
  providers: [
    provideHttpClient(withFetch())
    , MessageService,
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


 