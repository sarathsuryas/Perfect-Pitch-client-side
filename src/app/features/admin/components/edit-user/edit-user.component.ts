import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditUserDto } from 'src/app/core/dtos/editUser.dto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  editForm!: FormGroup;
  submitted:boolean = false
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
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
