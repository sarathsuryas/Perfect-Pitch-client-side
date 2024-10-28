import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {
 constructor(private readonly _userService:UserService) {}
videos:IVideoList[] = []
  ngOnInit(): void {
    this._userService.getVideoList().subscribe((data)=>{
     this.videos = data
    })
  }

 }
