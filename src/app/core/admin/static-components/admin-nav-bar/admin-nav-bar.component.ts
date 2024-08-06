import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminLogout } from 'src/app/store/admin/admin.action';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {
  constructor(private _store:Store){}
    logout(){
       this._store.dispatch(adminLogout())
    }
}
