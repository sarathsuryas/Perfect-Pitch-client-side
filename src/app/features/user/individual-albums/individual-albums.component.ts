import { Component } from '@angular/core';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { AlbumService } from '../services/album/album.service';
import { SharedService } from '../services/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-individual-albums',
  templateUrl: './individual-albums.component.html',
  styleUrls: ['./individual-albums.component.css']
})
export class IndividualAlbumsComponent {
  albumData: IAlbumData[] = []
  search: boolean = false
  nextPage:number = 0
  isLoading=false;
   currentPage=1;
   itemsPerPage=8;
   query:string = ''
   toggleLoading = ()=>this.isLoading=!this.isLoading;
  artistId:string =''
  constructor(private _albumService: AlbumService,private _activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.artistId = this._activatedRoute.snapshot.params['id'];
    this.loadMore();

  }



  loadMore() {
    this.toggleLoading();
    this._albumService.getIndividualAlbums(this.currentPage,this.itemsPerPage,this.artistId).subscribe({
      next:data=> this.albumData = data
    })
  }


  appendData(){
    this.toggleLoading();
    this._albumService.getIndividualAlbums(this.currentPage,this.itemsPerPage,this.artistId).subscribe({
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
