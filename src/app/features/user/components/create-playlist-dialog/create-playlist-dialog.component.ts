import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-playlist-dialog',
  templateUrl: './create-playlist-dialog.component.html',
  styleUrls: ['./create-playlist-dialog.component.css']
})
export class CreatePlaylistDialogComponent {
  playlistForm: FormGroup;
  visibilityOptions = [
    { value: 'public', viewValue: 'Public' },
    { value: 'private', viewValue: 'Private' },
  ];

  constructor(
    public dialogRef: MatDialogRef<CreatePlaylistDialogComponent>,
    private fb: FormBuilder
  ) {
    this.playlistForm = this.fb.group({
      title: ['', [Validators.required,Validators.pattern(/^(?!\s*$).+/)]],
      visibility: ['private', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.playlistForm.valid) {
      this.dialogRef.close(this.playlistForm.value);
    }
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
