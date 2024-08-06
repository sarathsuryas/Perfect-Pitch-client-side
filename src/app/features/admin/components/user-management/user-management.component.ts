import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { addUser, blockUser, editUser, editUserSuccess, getUsers } from 'src/app/store/admin/admin.action';
import { userModel } from 'src/app/store/user/user.model';
import { selectUsersData } from 'src/app/store/user/user.selector';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
check!: boolean 
isModalOpen: boolean = true
  constructor(private readonly _store:Store,private readonly _messageService: MessageService,
    private dialog: MatDialog
  ) { 
   
  }
  Users:userModel[] = [] 
  ngOnInit(): void { 
    this._store.dispatch(getUsers())
     this._store.select(selectUsersData).subscribe((data)=>{
     
      this.Users = data
     })
     
  }
 
 onCheckboxChange(email:string) {
       this._store.dispatch(blockUser({email}))
       this._store.select(selectUsersData).subscribe((data)=>{
        this.Users = data
       })
  }
   
  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User Data:', result);
        this._store.dispatch(addUser({userData:result}))
        this._store.select(selectUsersData).subscribe((data)=>{
          this.Users = data
         })
    }
    });
  }

  openEditDialog(user:EditUserDto): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px', 
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this._store.dispatch(editUser({userData:result}))
       this._store.select(selectUsersData).subscribe((data)=>{
        this.Users = data
       })
      }
    });
  }
}
