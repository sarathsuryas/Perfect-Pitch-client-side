import { Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges, VERSION } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { IUserData } from 'src/app/core/interfaces/IUserData';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { OldPasswordComponent } from '../old-password/old-password.component';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import { PresignedUrlService } from '../../services/presigned-url/presigned-url.service';
import { UserAuthService } from '../../services/user-auth/user-auth.service';

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
  uniqueKey:string = ''
 
  constructor(
    private _userService: UserService,
    private _userAuthService:UserAuthService,
    private dialog: MatDialog,
    private _messageService: MessageService,
    private _presignedUrlService:PresignedUrlService
  ) { 

  }
  




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
       this.userData.fullName = result.fullName
        this._userService.editProfile(result)
      }
    });
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
    this._userAuthService.logOut()
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
    this._presignedUrlService.getPresignedUrl( myId + this.fileObj.name , this.fileObj.type).subscribe((result) => {
      if (result.success) {
        const fileuploadurl = result.presignedUrl.url
        this.uniqueKey = result.presignedUrl.uniqueKey
        const imageForm = new FormData();
        imageForm.append('file', this.fileObj);
       
        this._userService.profileImageUpload(fileuploadurl, this.fileObj.type, this.fileObj).subscribe((result) => {
         if(result) {
          this._userService.submitProfileImageDetails(this.uniqueKey).subscribe()
         }
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



