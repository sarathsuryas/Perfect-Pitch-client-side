import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setAdminTokenCookie } from './store/admin/admin.action';
import { getUserData, userSetTokenFromCookie } from './store/user/user.action';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "sarath"
  constructor(private _store:Store,private _cookieService:CookieService,private authService: SocialAuthService) {
    this._store.dispatch(getUserData())
    this._store.dispatch(setAdminTokenCookie())
    const token = _cookieService.get('token')
    this._store.dispatch(userSetTokenFromCookie({token}))
  }
 

  ngOnInit(): void {
    initFlowbite();
  }
}
