import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  // value = "sarath"
  // ngOnInit() {
  // this.value = "gffdfdsfds"
  // }
// albumForm: FormGroup;
// albumThumbnailPreview: string | null = null;
// genres: string[] = [
//   'Rock', 'Pop', 'Hip Hop', 'R&B', 'Country', 'Jazz', 'Classical', 'Electronic', 'Folk', 'Blues'
// ];

// constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
//   this.albumForm = this.fb.group({
//     albumName: ['', Validators.required],
//     albumThumbnail: [null, Validators.required],
//     tracks: this.fb.array([])
//   });
//   this.addTrack(); // Add one track by default
// }

// get tracks() {
//   return this.albumForm.get('tracks') as FormArray;
// }

// addTrack() {
//   const trackForm = this.fb.group({
//     name: ['', Validators.required],
//     file: [null, Validators.required],
//     thumbnail: [null]
//   });
//   this.tracks.push(trackForm);
// }

// removeTrack(index: number) {
//   this.tracks.removeAt(index);
// }

// onAlbumThumbnailSelected(event: Event) {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     this.albumForm.patchValue({ albumThumbnail: file });
//     this.albumForm.get('albumThumbnail')?.updateValueAndValidity();

//     const reader = new FileReader();
//     reader.onload = () => {
//       this.albumThumbnailPreview = reader.result as string;
//     };
//     reader.readAsDataURL(file);
//   }
// }

// onTrackFileSelected(event: Event, index: number) {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     this.tracks.at(index).patchValue({ file: file });
//     this.tracks.at(index).get('file')?.updateValueAndValidity();
//   }
// }

// onTrackThumbnailSelected(event: Event, index: number) {
//   const file = (event.target as HTMLInputElement).files?.[0];
//   if (file) {
//     this.tracks.at(index).patchValue({ thumbnail: file });
//     this.tracks.at(index).get('thumbnail')?.updateValueAndValidity();
//   }
// }

// getTrackPreviewUrl(index: number): string {
//   const file = this.tracks.at(index).get('file')?.value;
//   return file ? URL.createObjectURL(file) : '';
// }

// getTrackThumbnailPreview(index: number): string | null {
//   const file = this.tracks.at(index).get('thumbnail')?.value;
//   if (file) {
//     return URL.createObjectURL(file);
//   }
//   return null;
// }

// onSubmit() {
//   if (this.albumForm.valid) {
//     console.log('Album data:', this.albumForm.value);
//     // Here you would typically send the data to your backend
//     this.snackBar.open('Album uploaded successfully!', 'Close', { duration: 3000 });
//   } else {
//     this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
//   }
// }

}
