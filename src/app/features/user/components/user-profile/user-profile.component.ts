import { Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges, VERSION } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { OldPasswordComponent } from '../old-password/old-password.component';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/store/user/user.action';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnChanges {

userData!:IUserData
name = 'Angular ' + VERSION.major;
url:string | ArrayBuffer | null |undefined
selectedFile!: File;
constructor(
  private _userService:UserService,
  private dialog: MatDialog,
  private _messageService:MessageService, 
  private _store:Store,
  private _cookieService:CookieService
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
//    this._userService.userData().subscribe((data)=>{
//       this.userData = data 
// })
}
oldPassword(): void {
  const dialogRef = this.dialog.open(OldPasswordComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
      this._userService.checkOldPassword(result.oldPassword).subscribe((data)=>{
        if(data)  {
           this._messageService.add({ severity: 'success', summary: 'success', detail: data.message })
           this.channgePassword()
        }
      },
      (error:Error)=> {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      } 
    
    )
    }
  });
}


channgePassword(): void {
  const dialogRef = this.dialog.open(ResetPasswordComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
      this._userService.resetPassword(result.confirmPassword).subscribe((data)=>{
        if(data) {
          this._messageService.add({ severity: 'success', summary: 'success', detail: data.message })
        }
      },
      (error:Error) =>{
        this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
      }
    )
    }
  });
}

logout() {
   this._store.dispatch(logOut())
   this._cookieService.delete('token')
   this._userService.logOut()
}


} 



