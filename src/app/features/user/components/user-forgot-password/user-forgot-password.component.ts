import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.component.html',
  styleUrls: ['./user-forgot-password.component.css']
})
export class UserForgotPasswordComponent {
  RequestResetForm!: FormGroup;
  forbiddenEmails: any;
  errorMessage!: string | null;
  successMessage!: string | null;
  IsvalidForm = true;

  constructor(
    private _userService:UserService,
    private _router: Router,
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser() {
   
    if (this.RequestResetForm.valid) {
      this.IsvalidForm = true;
      this._userService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
    
          this.RequestResetForm.reset();
          this.successMessage = "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this._router.navigate(['']);
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
