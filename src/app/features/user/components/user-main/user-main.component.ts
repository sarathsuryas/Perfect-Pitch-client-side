import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit{
  sidebar:boolean = true;

constructor(public breakpointObserver: BreakpointObserver,private _userService:UserService) {}
ngOnInit(): void {
  this.breakpointObserver.observe(['(max-width:768px)']).subscribe((state:BreakpointState)=>{
    if(state.matches){
      this.sidebar = false
    }
  })
  this._userService
}

}
