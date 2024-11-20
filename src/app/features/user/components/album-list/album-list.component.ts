import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IAlbumData } from 'src/app/core/interfaces/IAlbumData';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from 'src/app/store/search/search.selector';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albumData: IAlbumData[] = []
  search: boolean = false
  constructor(private _userService: UserService, private _store: Store) { }
  ngOnInit(): void {
    this._store.select(selectSearchQuery).subscribe({
      next: (value) => {
        if (value) {
          this.search = true
        }
        if (this.search) {
          this._userService.getAlbums(value).subscribe((data) => {
            this.albumData = data
          })
        }

      }
    })

    if (!this.search) {
      this._userService.getAlbums().subscribe((data) => {
        this.albumData = data
      })
    }
  }

}
