import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reset-password',
  templateUrl: './admin-reset-password.component.html',
  styleUrls: ['./admin-reset-password.component.css']
})
export class AdminResetPasswordComponent {
  RequestResetForm!: FormGroup;
  forbiddenEmails: any;
  errorMessage!: string | null;
  successMessage!: string | null;
  IsvalidForm = true;

  constructor(
    private _adminService:AdminService,
    private _router: Router,
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser() {
    console.log()
    if (this.RequestResetForm.valid) {
      this.IsvalidForm = true;
      this._adminService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
    
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this._router.navigate(['admin']);
          }, 3000);
        },
        err => {

          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}
