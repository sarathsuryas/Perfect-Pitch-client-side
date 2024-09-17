import { Component } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  constructor(){

  }
  ngOnInit() {

    $('.wrap-video').hover(function () {
   const video =   $('video', this).get(0) as HTMLVideoElement
   video.play()
   },function() {
    const video =   $('video', this).get(0) as HTMLVideoElement
    video.pause()
   });
  }
}
