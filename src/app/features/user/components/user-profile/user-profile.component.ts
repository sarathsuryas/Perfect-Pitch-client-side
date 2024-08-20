import { Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges, VERSION } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnChanges,DoCheck {
userData!:IUserData
name = 'Angular ' + VERSION.major;
url:string | ArrayBuffer | null |undefined
selectedFile!: File;
constructor(
  private _userService:UserService,
  private dialog: MatDialog  
) {}
 
  ngOnChanges(changes: SimpleChanges): void {
   
  }
 

  ngOnInit(): void {
      this._userService.userData().subscribe((data)=>{
            this.userData = data 
            this.url = data.profileImage
      })
  }
  
  
  onSelectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile); 

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.url = e.target?.result ?? null;
      };
    }
    this._userService.profileImageUpload(this.selectedFile).subscribe()
  }
  
  openEditDialog(user: EditUserDto): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
       this._userService.editProfile(result)
      }
    });
  }
  ngDoCheck(): void {
    this._userService.userData().subscribe((data)=>{
      this.userData = data 
      this.url = data.profileImage
})
}
 


}
