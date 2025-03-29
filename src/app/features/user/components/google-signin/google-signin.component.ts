import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IGoogleLoginDto } from 'src/app/core/dtos/IGoogleLogin.dto';
import { googleLoginUser } from 'src/app/store/user/user.action';
import { UserState } from 'src/app/store/user/user.state';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

declare global {
  interface Window {
    google: any;
  }
}
@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.css']
})
export class GoogleSigninComponent implements OnInit {
  
  @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();
  authSubscription!: Subscription;
  private googleLoginWrapper!: HTMLElement;

  constructor( 
    private readonly _authService: SocialAuthService,
    private readonly _store: Store<UserState>,
    private readonly _sub:UserAuthService
  ) {  }
  createFakeGoogleWrapper = () => {
     this.googleLoginWrapper = document.createElement('div');
    this.googleLoginWrapper.style.display = 'none';
    this.googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(this.googleLoginWrapper);
    window.google.accounts.id.renderButton(this.googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = this.googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };
 

  ngOnInit(): void {
    this.authSubscription = this._authService.authState.subscribe({
      next:(user:IGoogleLoginDto)=>{
        /// issue with this line
         if(!localStorage.getItem('g-login')) {
           this._store.dispatch(googleLoginUser({userData:user}))
           localStorage.setItem('g-login','set')
         }
      },
      error:(error)=>{
        console.error(error)
      }
    });
  }

  handleGoogleLogin() {
    this.googleSignin(this.createFakeGoogleWrapper())
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();    
  }



}
