import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from 'src/app/store/search/search.selector';
import { AlbumService } from '../../services/album/album.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albumData: IAlbumData[] = []
  search: boolean = false
  nextPage:number = 0
  isLoading=false;
   currentPage=1;
   itemsPerPage=8;
   query:string = ''
   toggleLoading = ()=>this.isLoading=!this.isLoading;

  constructor(private _albumService: AlbumService, private _store: Store,private _sharedService:SharedService) { }
  ngOnInit(): void {
    this.loadMore();

    this._sharedService.searchAlbum$.subscribe({
      next: (value) => {
        if (value) {
          this.search = true
        }
        if (this.search) {
         this.query = value
          this._albumService.searchAlbums(value).subscribe((data) => {
            this.albumData = data
          })
        }
        if (this.search && this.query==='') {
          this.search = false
          this.currentPage=1;
          this.loadMore();
        }

      }
     
    })
    
    
  }



  loadMore() {
    this.toggleLoading();
    this._albumService.getAlbums(this.currentPage,this.itemsPerPage).subscribe({
      next:data=> this.albumData = data
    })
  }


  appendData(){
    this.toggleLoading();
    this._albumService.getAlbums(this.currentPage,this.itemsPerPage).subscribe({
     next:response=>this.albumData = [...this.albumData,...response],
     error:err=>console.log(err),
     complete:()=>this.toggleLoading()
    })
  }  
  onScroll () {
    this.currentPage++;
    this.appendData();
   }

  

}
