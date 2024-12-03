import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { selectSearchQuery } from 'src/app/store/search/search.selector';
import { Store } from '@ngrx/store';
import { VideoService } from '../../services/video/video.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {
  isLoading=false;
   currentPage=1;
   itemsPerPage=6;
   toggleLoading = ()=>this.isLoading=!this.isLoading;

  constructor(
    private _store: Store,
    private _videoService:VideoService
  ) { }
  videos: IVideoList[] = []
  search: boolean = false
  ngOnInit(): void {
    this.loadMore();

    this._store.select(selectSearchQuery).subscribe({
      next: (value) => {
        if (value) {
          this.search = true
        }
        if (this.search) {

          this._videoService.getVideoList().subscribe({
            next: (value) => {
              this.videos = value
            },
            error: (err) => {
              console.error(err)
            }
          })

        }
      }
    })
    if (!this.search) {
      this._videoService.getVideoList().subscribe((data) => {
        this.videos = data
      })
    }

  }      
  loadMore() {
    this.toggleLoading();
    this._videoService.getVideoList(this.currentPage,this.itemsPerPage).subscribe({
      next:data=> this.videos = data
    })
  }


  appendData(){
    this.toggleLoading();
    this._videoService.getVideoList(this.currentPage,this.itemsPerPage).subscribe({
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




// for (const value of data) {
//   this.videos.push(value)
// }