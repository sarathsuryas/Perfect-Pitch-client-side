import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMembershipComponent } from '../add-membership/add-membership.component';
import { AdminService } from '../../services/admin.service';
import { IMemberShip } from 'src/app/core/interfaces/IMemberShip';
interface Membership {
  id: number;
  name: string;
  price: number;
  isBlocked: boolean;
  features: string[];
  priceId: string;
}


@Component({
  selector: 'app-membership-management',
  templateUrl: './membership-management.component.html',
  styleUrls: ['./membership-management.component.css']
})
export class MembershipManagementComponent {
  memberships: IMemberShip[] = [];

  constructor(private dialog: MatDialog,private _adminService:AdminService) {}

  ngOnInit(): void {
    this._adminService.getMemberShips().subscribe({
      next:(value)=>{
      this.memberships = value
      }
    })
  }

  toggleBlockStatus(membership: IMemberShip): void {
    membership.isBlocked = !membership.isBlocked;
    this._adminService.blockUnblock(membership._id,membership.isBlocked).subscribe()
  }

  openAddMembershipModal(): void {
    const dialogRef = this.dialog.open(AddMembershipComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this._adminService.addMemberShip(result).subscribe()
        this.memberships.push({
          id: this.memberships.length + 1,
          ...result,
          isBlocked: false
        });
      }
    });
  }
}
