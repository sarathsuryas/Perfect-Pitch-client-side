import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
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
import { Subject, Subscription } from 'rxjs';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { CookieService } from 'ngx-cookie';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

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
export class UserLoginComponent implements OnInit,OnDestroy {
  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  loginForm!: FormGroup
  submitted = false;
  isLoggedin?: boolean = true
  authSubscription!: Subscription;
  constructor(
    private readonly _fb: FormBuilder,
    private readonly _store: Store<UserState>,
    private readonly _messageService: MessageService,
    private readonly _router: Router,
    private _cookieService: CookieService,
  ) {
    
  }
  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
    const userData = this._cookieService.get('userData')
    if (userData) {
      this._router.navigate(['otp-verify'])
    }
    this._store.select(selectIsAuthUser).subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isLoggedin = false
        this._router.navigate(['home/landing'])
      }
    })
    
    
  }
  
  ngOnDestroy(): void {
    
  }

  submit() {
    this.submitted = true
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this._store.dispatch(loginUser({ email, password }))
      this._store.select(selectLoginFail).subscribe((data) => {
        if (data) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: data })
        }
      })
    }
  }






}
