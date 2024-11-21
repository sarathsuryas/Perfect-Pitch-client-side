import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent {
@Input() albumData:IAlbumData[] = []
@Output() loadMoreAlbums = new EventEmitter()
loadMore() {
 this.loadMoreAlbums.emit()
} 

}
 