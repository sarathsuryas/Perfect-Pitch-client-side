import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit{
  albumData:IAlbumData[] = []

  constructor(private _userService:UserService) { }
  ngOnInit(): void {
   this._userService.getAlbums().subscribe((data)=>{
     this.albumData = data
     
   })
  }

}
