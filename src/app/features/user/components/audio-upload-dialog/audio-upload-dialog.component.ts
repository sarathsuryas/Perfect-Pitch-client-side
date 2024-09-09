import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audio-upload-dialog',
  templateUrl: './audio-upload-dialog.component.html',
  styleUrls: ['./audio-upload-dialog.component.css']
})
export class AudioUploadDialogComponent {
selectedOption: any;
constructor(public dialogRef: MatDialogRef<AudioUploadDialogComponent>,private _router:Router ) {}
onSelect() {
  if(this.selectedOption === 'single') {
    this._router.navigate(['/home/single-audio-upload'])
  } else {
    this._router.navigate(['/home/multiple-audio-upload'])
  }
   this.dialogRef.close()
}
onClose() {
this.dialogRef.close()
}

}
