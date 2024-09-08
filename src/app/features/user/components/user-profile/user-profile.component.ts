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
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userData!: IUserData
  name = 'Angular ' + VERSION.major;
  url: string | ArrayBuffer | null | undefined
  selectedFile!: File;
  presignedUrl: string = '';
  fileObj!: File;
  userId!:string | undefined

  constructor(
    private _userService: UserService,
    private dialog: MatDialog,
    private _messageService: MessageService,
    private _store: Store,
    private _cookieService: CookieService
  ) { }




  ngOnInit(): void {
    this._userService.userData().subscribe((data) => {
      this.userData = data
      this.url = data.profileImage
    })
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

        this._userService.checkOldPassword(result.oldPassword).subscribe((data) => {
          if (data) {
            this._messageService.add({ severity: 'success', summary: 'success', detail: data.message })
            this.channgePassword()
          }
        },
          (error: Error) => {
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
        this._userService.resetPassword(result.confirmPassword).subscribe((data) => {
          if (data) {
            this._messageService.add({ severity: 'success', summary: 'success', detail: data.message })
          }
        },
          (error: Error) => {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: error.message })
          }
        )
      }
    });
  }

  logout() {
    this._cookieService.delete('token')
    this._store.dispatch(logOut())
    this._userService.logOut()
  }



  onSelectFile(event: Event): void {
    const FILE = event.target as HTMLInputElement
    if (FILE.files && FILE.files[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        this.url = reader.result
      }
      reader.readAsDataURL(FILE.files[0]);
      this.fileObj = FILE.files[0];
      
    }
    const myId = uuidv4();
    this._userService.getPresignedUrl("uuid"+ myId + this.fileObj.name , this.fileObj.type,"userProfilePicture").subscribe((result) => {
      if (result.success) {
        const fileuploadurl = result.presignedUrl.url
        const imageForm = new FormData();
        imageForm.append('file', this.fileObj);
       
        this._userService.profileImageUpload(fileuploadurl, this.fileObj.type, this.fileObj).subscribe((result) => {
          console.log(result, 'result data')
        },

        ),
          (error: any) => {
            console.error("something went wrong", error)
            alert("something went wrong")
          }
      }
    })


  }


} 



