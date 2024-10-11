import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-reset-password-form',
  templateUrl: './admin-reset-password-form.component.html',
  styleUrls: ['./admin-reset-password-form.component.css']
})
export class AdminResetPasswordFormComponent {
  ResponseResetForm!: FormGroup;
  errorMessage!: string;
  successMessage!: string | null;
  resetToken!: null | string;
  CurrentState!: string;
  AdminId!:string
  IsResetFormValid = true;
  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder,
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
    this._adminService.ValidPasswordToken({ token: this.resetToken }).subscribe(
      data => {
       this.AdminId = data.token._adminId
        this.CurrentState = 'Verified';
      },
      err => {
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
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
      console.log(this.AdminId)
      this._adminService.newPassword(this.ResponseResetForm.controls['confirmPassword'].value,this.AdminId).subscribe(
        data => {
          this.ResponseResetForm.reset();
          this.successMessage = data.message;
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
    } else { this.IsResetFormValid = false; }
  }

}
