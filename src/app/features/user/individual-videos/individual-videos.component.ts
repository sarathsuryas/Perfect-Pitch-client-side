import { Component } from '@angular/core';
import { VideoService } from '../services/video/video.service';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-videos',
  templateUrl: './individual-videos.component.html',
  styleUrls: ['./individual-videos.component.css']
})
export class IndividualVideosComponent {
  isLoading=false;
  currentPage=1;
  itemsPerPage=6;
  toggleLoading = ()=>this.isLoading=!this.isLoading;
  query:string =''
  artistId:string = ''
 constructor(
   private _videoService:VideoService,
   private _activatedRoute:ActivatedRoute
 ) { }
 videos: IVideoList[] = []
 search: boolean = false
 ngOnInit(): void {
  this.artistId = this._activatedRoute.snapshot.params['id'];

   this.loadMore();

 }      
 loadMore() {
   this.toggleLoading();
   this._videoService.getIndividualVideos(this.currentPage,this.itemsPerPage,this.artistId).subscribe({
     next:data=> this.videos = data
   })
 }


 appendData(){
   this.toggleLoading();
   this._videoService.getIndividualVideos(this.currentPage,this.itemsPerPage,this.artistId).subscribe({
    next:response=>this.videos = [...this.videos,...response],
    error:err=>console.log(err),
    complete:()=>this.toggleLoading()
   })
 }  
 onScroll () {
   this.currentPage++;
   this.appendData();
  }


}
