import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { addUser, blockUser, editUser, editUserSuccess, getUsers, searchUser } from 'src/app/store/admin/admin.action';
import { userModel } from 'src/app/store/user/user.model';
import { selectUsersData } from 'src/app/store/user/user.selector';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
  Users: userModel[] = []
  value!: string;
  check!: boolean
  isModalOpen: boolean = true
  displayedColumns: string[] = [ 'name','email','active','edit'];
  dataSource!:MatTableDataSource<userModel>
  totalUsers!:number
@ViewChild(MatPaginator) paginator!: MatPaginator;


  
  constructor(
    private readonly _store: Store, 
    private readonly _messageService: MessageService,
    private dialog: MatDialog
  ) {

  }
  
  ngOnInit(): void {
    this._store.dispatch(getUsers())
    this._store.select(selectUsersData).subscribe((data) => {
      this.Users = data
     this.dataSource = new MatTableDataSource(data)
     this.totalUsers = data.length
     this.dataSource.paginator = this.paginator;
    })

  }
  

  search($event: Event) {
    this._store.dispatch(searchUser({ search: this.value }))
  }
  onCheckboxChange(email: string) {
    this._store.dispatch(blockUser({ email }))
    this._store.select(selectUsersData).subscribe((data) => {
      this.Users = data
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User Data:', result);
        this._store.dispatch(addUser({ userData: result }))
        this._store.select(selectUsersData).subscribe((data) => {
          this.Users = data
        })
      }
    });
  }

  openEditDialog(user: EditUserDto): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._store.dispatch(editUser({ userData: result }))
        this._store.select(selectUsersData).subscribe((data) => {
          this.Users = data
        })
      }
    });
  }




}

