import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResetPasswordComponent>
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['',Validators.compose([Validators.required])],
      confirmPassword:['', Validators.compose([Validators.required])]
    },
    {
      validators: Validation.match('newPassword', 'confirmPassword')
    }
  );
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.dialogRef.close(this.resetPasswordForm.value);
    }
  }

  
  

  onCancel(): void {
    this.dialogRef.close();
  }


}
