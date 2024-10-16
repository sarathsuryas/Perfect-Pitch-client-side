import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IGoogleLoginDto } from 'src/app/core/dtos/IGoogleLogin.dto';
import { googleLoginUser } from 'src/app/store/user/user.action';
import { UserState } from 'src/app/store/user/user.state';

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

  constructor( 
    private readonly _authService: SocialAuthService,
    private readonly _store: Store<UserState>,
  ) {  }
  createFakeGoogleWrapper = () => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);
    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
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
         this._store.dispatch(googleLoginUser({userData:user}))
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
