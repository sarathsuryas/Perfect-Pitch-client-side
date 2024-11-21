import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAdminTokenCookie } from './store/admin/admin.action';
import { userSetTokenFromCookie } from './store/user/user.action';
import { initFlowbite } from 'flowbite';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { UserService } from './features/user/services/user/user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "sarath"
  constructor(private _store:Store,private _cookieService:CookieService,private authService: SocialAuthService,private _userService:UserService,private _router:Router) {
    this._store.dispatch(setAdminTokenCookie())
    const token = localStorage.getItem('token') as string
    this._store.dispatch(userSetTokenFromCookie({token}))
  }
 

  ngOnInit(): void {
    
    initFlowbite();
  }
}
