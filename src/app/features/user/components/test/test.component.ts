import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  uploadedAt: string;
}
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
 
  videos: Video[] = [
    {
      id: '1',
      title: 'Amazing Sunset Timelapse in 4K',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Nature Vibes',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 1234567,
      uploadedAt: '2 weeks ago'
    },
    {
      id: '2',
      title: 'Learn Angular in 60 Minutes - Full Course for Beginners',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Code Master',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 987654,
      uploadedAt: '3 days ago'
    },
    {
      id: '3',
      title: 'Easy 30-Minute Recipes for Busy People',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Quick Meals',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 567890,
      uploadedAt: '1 month ago'
    },
    {
      id: '4',
      title: 'Top 10 Travel Destinations for 2023',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Wanderlust Adventures',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 2345678,
      uploadedAt: '5 days ago'
    },
    {
      id: '5',
      title: 'The Science Behind Climate Change Explained',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Science Today',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 789012,
      uploadedAt: '1 week ago'
    },
    {
      id: '6',
      title: 'Mastering Guitar: From Beginner to Pro',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Music Maestro',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 456789,
      uploadedAt: '2 months ago'
    },
    {
      id: '7',
      title: 'The History of Ancient Rome in 20 Minutes',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'History Buff',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 3456789,
      uploadedAt: '3 weeks ago'
    },
    {
      id: '8',
      title: 'DIY Home Decor Ideas on a Budget',
      thumbnail: '/placeholder.svg?height=180&width=320',
      channelName: 'Crafty Creator',
      channelAvatar: '/placeholder.svg?height=36&width=36',
      views: 678901,
      uploadedAt: '4 days ago'
    }
  ];

  constructor() { }

  ngOnInit(): void {

  }

}
