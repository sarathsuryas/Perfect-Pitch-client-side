import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { IAlbumDetails } from 'src/app/core/interfaces/IAlbumDetails';
import { debounce, debounceTime, Observable } from 'rxjs';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id!: string 
  albumData$!:Observable<IAlbumDetails> 
  albumData:IAlbumDetails = {title:'',artistName:'',thumbNailLink:'',songs:[]}
  songId!:string
 constructor(private _userService:UserService,private route: ActivatedRoute) {
  this.id = this.route.snapshot.paramMap.get('id') as string
   this.albumData$ = this._userService.getAlbumDetails(this.id)
   this.albumData$.subscribe((data)=>{
    this.albumData = data
  
   })
 }

  ngOnInit(): void {
    var isPlaying=0;
    var audio=document.querySelector("#inwr") as HTMLAudioElement
    /*$("#w-w-dm-id .play").click(function() {
           $("#w-w-dm-id .play").removeClass("play-sel");
           $("#" + $(item.currentTarget).attr("id")).addClass("play-sel");
    });*/
    $("#w-w-dm-id .play-cont").click(function() {
            isPlaying=0;
            audio.pause();
    }); 
 
  }
  changeSong(index:number) {
    var isPlaying=0;
    const link = this.albumData.songs[index].link
    var audio=document.querySelector("#inwr") as HTMLAudioElement
      $("#w-w-dm-id .p1").click(function() {
        isPlaying=1;
        audio.setAttribute("src",link);
        audio.currentTime = 0;
        audio.play()
      
    })
  }
}
