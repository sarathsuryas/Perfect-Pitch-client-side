import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdminService } from 'src/app/features/admin/services/admin.service';
import { adminLogout, removeToken } from 'src/app/store/admin/admin.action';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent {
  constructor(private _store:Store,private _adminService:AdminService,private _router:Router){}
    logout(){
       this._store.dispatch(removeToken())
       this._adminService.logOut()
       this._router.navigate(['admin'])
    }
}
