import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { Router } from '@angular/router';
import { GenreService } from '../../services/genre/genre.service';
interface Genre {
  id: number;
  name: string;
  imageUrl: string;
  color: string;
}
@Component({
  selector: 'app-music-genres',
  templateUrl: './music-genres.component.html',
  styleUrls: ['./music-genres.component.css']
})
export class MusicGenresComponent implements OnInit {
  genres: IGenres[] = [];

  constructor(private _genreService:GenreService,private _router:Router) {}
  ngOnInit(): void {
     this._genreService.getGenres().subscribe({
      next:(value)=>{
       this.genres = value
      },
      error:(err)=>{
        console.log(err)
      }
     })
  }
  

  onGenreClick(genre: IGenres): void {
    this._router.navigate([`/home/songs-list/${genre._id}`])
  }
}
