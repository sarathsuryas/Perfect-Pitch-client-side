import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { googleLoginUser, loginUser } from 'src/app/store/user/user.action';
import { selectIsAuthUser, selectLoginFail } from 'src/app/store/user/user.selector';
import { UserState } from 'src/app/store/user/user.state';
import {
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';
import { IGoogleLoginDto } from 'src/app/core/dtos/IGoogleLogin.dto';

declare global {
  interface Window {
    google: any;
  }
}
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  loginForm!: FormGroup
  submitted = false;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  authSubscription!: Subscription;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<UserState>,
    private readonly _messageService: MessageService,
    private readonly _router:Router,
    private readonly _authService: SocialAuthService
  ) { }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    })
   
   

    this._store.select(selectIsAuthUser).subscribe(isAuthenticated=>{
      if(isAuthenticated) {
        this._router.navigate(['home'])
      }
    })


    this.authSubscription = this._authService.authState.subscribe({
      next:(user:IGoogleLoginDto)=>{
         this._store.dispatch(googleLoginUser({userData:user}))
      },
      error:(error)=>{
        console.error(error)
      }
    });

  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  submit() {
    this.submitted = true
    if(this.loginForm.valid) {
      const {email,password} = this.loginForm.value
      this._store.dispatch(loginUser({email,password}))
      this._store.select(selectLoginFail).subscribe((data)=>{
        if(data) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: data })
        }
      })
    }
  }

  
  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
  
 

}
