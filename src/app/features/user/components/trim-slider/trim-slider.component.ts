import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUploadShortsDto } from 'src/app/core/dtos/uploadShorts.dto';

@Component({
  selector: 'app-trim-slider',
  templateUrl: './trim-slider.component.html',
  styleUrls: ['./trim-slider.component.css']
})
export class TrimSliderComponent {
  @Input() videoSrc:string | null = null;
  @Input() selectedFile: File | null = null;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('trimSlider') trimSlider!: ElementRef<HTMLDivElement>;
  @ViewChild('startHandle') startHandle!: ElementRef<HTMLDivElement>;
  @ViewChild('endHandle') endHandle!: ElementRef<HTMLDivElement>;

  
  videoDuration = 0;
  currentTime = 0;
  startTime = 0;
  endTime = 0;
  isDragging = false;
  activeHandle: 'start' | 'end' | null = null;
 
 constructor(private _userService:UserService) {} 
 

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.addEventListener('loadedmetadata', () => {
      this.videoDuration = video.duration;
      this.endTime = this.videoDuration;
      this.updateSliderPositions();
    });

    video.addEventListener('timeupdate', () => {
      this.currentTime = video.currentTime;
      if (this.currentTime < this.startTime || this.currentTime > this.endTime) {
        video.currentTime = this.startTime;
      }
    });

    this.initializeDragListeners();
  }

  initializeDragListeners() {
    const slider = this.trimSlider.nativeElement;

    const onMouseMove = (e: MouseEvent) => {
      if (this.isDragging && this.activeHandle) {
        const rect = slider.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        this.updateHandlePosition(this.activeHandle, position);
      }
    };

    const onMouseUp = () => {
      this.isDragging = false;
      this.activeHandle = null;
    };

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('handle')) {
        this.isDragging = true;
        this.activeHandle = target.classList.contains('start-handle') ? 'start' : 'end';
      }
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  updateHandlePosition(handle: 'start' | 'end', position: number) {
    const time = Math.max(0, Math.min(this.videoDuration, position * this.videoDuration));
    if (handle === 'start') {
      this.startTime = Math.min(time, this.endTime - 1);
    } else {
      this.endTime = Math.max(time, this.startTime + 1);
    }
    this.updateSliderPositions();
  }

  updateSliderPositions() {
    const startPercentage = (this.startTime / this.videoDuration) * 100;
    const endPercentage = (this.endTime / this.videoDuration) * 100;
    this.startHandle.nativeElement.style.left = `${startPercentage}%`;
    this.endHandle.nativeElement.style.left = `${endPercentage}%`;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  playPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  trimVideo() {
    this._userService.trimVideo({start:this.formatTime(this.startTime),end:this.formatTime(this.endTime),file:this.selectedFile as File}).subscribe({
      next:(data)=>{
       console.log(data)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }
}


