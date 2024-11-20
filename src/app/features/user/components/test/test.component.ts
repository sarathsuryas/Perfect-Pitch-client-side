import { Component, ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { environment } from 'src/environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
 
  uploadForm!: FormGroup;
  videoPreviewUrl: string | null = null;
  thumbnailPreviewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  onVideoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.videoPreviewUrl = URL.createObjectURL(file);
    }
  }

  onThumbnailSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.thumbnailPreviewUrl = URL.createObjectURL(file);
    }
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.videoPreviewUrl && this.thumbnailPreviewUrl) {
      // Here you would typically send the form data and files to your server
      console.log('Form data:', this.uploadForm.value);
      console.log('Video file:', this.videoPreviewUrl);
      console.log('Thumbnail file:', this.thumbnailPreviewUrl);
      
      this.snackBar.open('Video uploaded successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    }
  }
 
}


 
 


