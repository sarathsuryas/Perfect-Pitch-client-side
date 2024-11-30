import { Component, OnInit } from '@angular/core';
import { IVideoDetails } from 'src/app/core/interfaces/IVideoDetails';
import { ICurrentUser } from 'src/app/core/interfaces/ICurrentUser';
import { ShortsService } from '../../services/shorts/shorts.service';


@Component({
  selector: 'app-shorts',
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.css']
})
export class ShortsComponent implements OnInit {
  shorts:IVideoDetails[] = []
  currentUser!:ICurrentUser
 constructor(private _shortsService:ShortsService) {}
  ngOnInit(): void {
    this._shortsService.getShorts().subscribe({
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
