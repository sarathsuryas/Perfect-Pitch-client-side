import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-reset-password-form',
  templateUrl: './user-reset-password-form.component.html',
  styleUrls: ['./user-reset-password-form.component.css']
})
export class UserResetPasswordFormComponent {
  ResponseResetForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string | null;
  resetToken!: null | string;
  CurrentState!: string;
  UserId!:string
  IsResetFormValid = true;
  constructor(
    private _userService:UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
  ) {

    this.CurrentState = 'Wait';
    this._route.params.subscribe(params => {
      this.resetToken = params['token'];
      this.VerifyToken();
    });
  }


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    this._userService.ValidPasswordToken({ token: this.resetToken }).subscribe(
      data => {
       this.UserId = data.token._adminId
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this._fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls['newPassword'].value;
    const confirm_password = passwordFormGroup.controls['confirmPassword'].value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }


  ResetPassword() {
    if (this.ResponseResetForm.valid) {
      this.IsResetFormValid = true;
      console.log(this.UserId)
      this._userService.newPassword(this.ResponseResetForm.controls['confirmPassword'].value,this.UserId).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
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
    } else { this.IsResetFormValid = false; }
  }
}
