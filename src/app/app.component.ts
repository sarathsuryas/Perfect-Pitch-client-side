import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAdminTokenCookie } from './store/admin/admin.action';
import { getUserData, logOut, userSetTokenFromCookie } from './store/user/user.action';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { selctIsBlocked } from './store/user/user.selector';
import { UserService } from './features/user/services/user/user.service';
import { removeSongId } from './store/playlist/playlist.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "sarath"
  constructor(private _store:Store,private _cookieService:CookieService,private authService: SocialAuthService,private _userService:UserService,private _router:Router) {
    this._store.dispatch(setAdminTokenCookie())
    const token = this._cookieService.get('token')
    this._store.dispatch(userSetTokenFromCookie({token}))
  }
 

  ngOnInit(): void {
    
    initFlowbite();
  }
}
