import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-old-password',
  templateUrl: './old-password.component.html',
  styleUrls: ['./old-password.component.css']
})
export class OldPasswordComponent {
  oldPasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OldPasswordComponent>
  ) {}

  ngOnInit(): void {
    this.oldPasswordForm = this.fb.group({
      oldPassword: ['',Validators.compose([Validators.required])],
    });
  }

  onSubmit(): void {
    if (this.oldPasswordForm.valid) {
      this.dialogRef.close(this.oldPasswordForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
