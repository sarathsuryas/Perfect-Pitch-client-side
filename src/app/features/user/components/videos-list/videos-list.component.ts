import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IVideoList } from 'src/app/core/interfaces/IVideoList';
import { selectSearchQuery } from 'src/app/store/search/search.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  constructor(private readonly _userService: UserService, private _store: Store) { }
  videos: IVideoList[] = []
  search: boolean = false
  ngOnInit(): void {
    this._store.select(selectSearchQuery).subscribe({
      next: (value) => {
        if (value) {
          this.search = true
        }
        if (this.search) {
        
          this._userService.getVideoList({query:value}).subscribe({
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
      this._userService.getVideoList().subscribe((data) => {
        this.videos = data
      })
    }

  }
  loadMore() {
    const nextPage = Math.ceil(this.videos.length / 10) + 1; 
    this._userService.getVideoList({nextPage}).subscribe((data) => {
      for (const value of data) {
        this.videos.push(value)
      }
    })
  }
}
