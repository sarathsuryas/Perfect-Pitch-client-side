import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { IVideoDetails } from 'src/app/core/interfaces/IVideoDetails';
import { ICurrentUser } from 'src/app/core/interfaces/ICurrentUser';

@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.css']
})
export class ShortsComponent implements OnInit {
  shorts:IVideoDetails[] = []
  currentUser!:ICurrentUser
 constructor(private _userService:UserService) {}
  ngOnInit(): void {
    this._userService.getShorts().subscribe({
      next:(data)=>{
        this.shorts = data.shorts
        this.currentUser = data.user
      },
      error:(err)=>{
         console.error(err)
      }
    })
  }
 
}
