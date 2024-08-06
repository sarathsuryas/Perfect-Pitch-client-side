import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { AddUserComponent } from './features/admin/components/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setAdminTokenCookie } from './store/admin/admin.action';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "sarath"
  constructor(private _store:Store) {
    this._store.dispatch(setAdminTokenCookie())
  }
  
}
