import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  editForm!: FormGroup;
  submitted:boolean = false
@Input() name!:string

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data:EditUserDto
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      fullName: [this.data.fullName, Validators.required],
      email: [this.data.email, [Validators.required]],
      
    });
  }

  onSubmit(): void {
    this.submitted = true
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
