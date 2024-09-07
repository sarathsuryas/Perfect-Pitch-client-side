import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AddUserComponent } from './features/admin/components/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setAdminTokenCookie } from './store/admin/admin.action';
import { userSetTokenFromCookie } from './store/user/user.action';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = "sarath"
  constructor(private _store:Store,private _cookieService:CookieService) {
    this._store.dispatch(setAdminTokenCookie())
    const token = _cookieService.get('token')
    this._store.dispatch(userSetTokenFromCookie({token}))
  }
  ngOnInit(): void {
    initFlowbite();
  }
}
