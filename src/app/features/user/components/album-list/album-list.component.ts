import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';

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
