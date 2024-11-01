import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent {
  membershipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMembershipComponent>
  ) {
    this.membershipForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      priceId: ['', Validators.required],
      features: this.fb.array([])
    });
  }
  get features(): FormArray {
    return this.membershipForm.get('features') as FormArray;
  }

  addFeature(): void {
    const features = this.membershipForm.get('features') as FormArray;
    features.push(this.fb.control(''));
  }

  removeFeature(index: number): void {
    const features = this.membershipForm.get('features') as FormArray;
    features.removeAt(index);
  }

  onSubmit(): void {
    if (this.membershipForm.valid) {
      this.dialogRef.close(this.membershipForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
