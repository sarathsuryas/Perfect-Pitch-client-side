import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/features/user/services/user/user.service';
import { AdminService } from '../../services/admin.service';
import { IGenres } from 'src/app/core/interfaces/IGenres';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-add-genres',
  templateUrl: './add-genres.component.html',
  styleUrls: ['./add-genres.component.css']
})
export class AddGenresComponent implements OnInit{

  constructor(private _adminService:AdminService, private readonly _messageService: MessageService) {}
     
   
  genres: IGenres[] = [
    
  ];

  newGenreName: string = '';
  colors: string[] = ['bg-pink-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-indigo-500', 'bg-orange-500'];

  addGenre() {
    if (this.newGenreName.trim()) {
      const newId = Math.max(...this.genres.map(g => g.newId), 0) + 1;
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
     
      this._adminService.addGenres(this.newGenreName,newId,randomColor).subscribe({
        next:(value)=>{
          if(!value.success) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail:'genre exist' })
          } else {
            this.genres.push({
              newId: newId,
              Genre: this.newGenreName.trim(),
              color: randomColor
            });
            this.newGenreName = '';
           }
        },
        error:(err)=>{
          console.error(err)
        }
      })
    }
  }
  ngOnInit(): void {
    this._adminService.getGenres().subscribe({
      next:(value)=>{
       this.genres = value
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  removeGenre(id: number) {
    this.genres = this.genres.filter(genre => genre.newId !== id);
  }

}
