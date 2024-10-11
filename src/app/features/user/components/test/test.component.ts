import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  subscribers: number;
  isSubscribed: boolean;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  // albumForm: FormGroup;
  // thumbnailPreview: string | ArrayBuffer | null = null;

  // constructor(private fb: FormBuilder) {
  //   this.albumForm = this.fb.group({
  //     albumName: ['', Validators.required],
  //     thumbnail: [null, Validators.required],
  //     tracks: this.fb.array([])
  //   });
  // }

  // ngOnInit(): void {
  //   this.addTrack();
  // }

  // get tracks() {
  //   return this.albumForm.get('tracks') as FormArray;
  // }

  // addTrack() {
  //   const trackForm = this.fb.group({
  //     trackName: ['', Validators.required],
  //     trackFile: [null, Validators.required]
  //   });
  //   this.tracks.push(trackForm);
  // }

  // removeTrack(index: number) {
  //   this.tracks.removeAt(index);
  // }

  // onThumbnailSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.albumForm.patchValue({ thumbnail: file });
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.thumbnailPreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  // onTrackSelected(event: Event, index: number) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.tracks.at(index).patchValue({ trackFile: file });
  //   }
  // }

  // onSubmit() {
  //   if (this.albumForm.valid) {
  //     console.log(this.albumForm.value);
     

      
  //   }
  // }

  artists: Artist[] = [
    {
      id: 1,
      name: 'Taylor Swift',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 1000000,
      isSubscribed: false
    },
    {
      id: 2,
      name: 'Ed Sheeran',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 800000,
      isSubscribed: true
    },
    {
      id: 3,
      name: 'Beyoncé',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 1200000,
      isSubscribed: false
    },
    {
      id: 4,
      name: 'Drake',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 950000,
      isSubscribed: false
    },
    {
      id: 5,
      name: 'Adele',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 1100000,
      isSubscribed: true
    },
    {
      id: 6,
      name: 'The Weeknd',
      imageUrl: '/placeholder.svg?height=100&width=100',
      subscribers: 890000,
      isSubscribed: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  toggleSubscription(artist: Artist): void {
    artist.isSubscribed = !artist.isSubscribed;
    if (artist.isSubscribed) {
      artist.subscribers++;
    } else {
      artist.subscribers--;
    }
    // Here you would typically call a service to update the subscription status on the server
    console.log(`${artist.isSubscribed ? 'Subscribed to' : 'Unsubscribed from'} ${artist.name}`);
  }

  formatSubscribers(subscribers: number): string {
    if (subscribers >= 1000000) {
      return (subscribers / 1000000).toFixed(1) + 'M';
    } else if (subscribers >= 1000) {
      return (subscribers / 1000).toFixed(1) + 'K';
    }
    return subscribers.toString();
  }

}
