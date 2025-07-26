import { Component, HostListener, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {  removeToken } from 'src/app/store/admin/admin.action';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {

 
 

 
   constructor(private _store:Store,private _adminService:AdminService,private _router:Router){}
  

  
       logout(){
          this._store.dispatch(removeToken())
          this._adminService.logOut()
          this._router.navigate(['admin'])
       }
}
 