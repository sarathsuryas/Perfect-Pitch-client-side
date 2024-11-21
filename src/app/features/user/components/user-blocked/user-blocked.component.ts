import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selctIsBlocked } from 'src/app/store/user/user.selector';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-blocked',
  templateUrl: './user-blocked.component.html',
  styleUrls: ['./user-blocked.component.css']
})
export class UserBlockedComponent implements OnInit {
constructor(private _store:Store,private _userService:UserService) {}

  ngOnInit(): void {
  }
  
}
