import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideoComponent } from '../upload-video/upload-video.component';
import { AudioUploadDialogComponent } from '../audio-upload-dialog/audio-upload-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-main',
  templateUrl:  './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})

export class UserMainComponent implements OnInit {
  //   sidebar:boolean = true;

  // constructor(public breakpointObserver: BreakpointObserver,private _userService:UserService) {}
  // ngOnInit(): void {
  //   this.breakpointObserver.observe(['(max-width:768px)']).subscribe((state:BreakpointState)=>{
  //     if(state.matches){
  //       this.sidebar = false
  //     }
  //   })

  // }
  
  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = true;
  searchBar: boolean = false
  show: boolean = true
  animal!: string;
  name!: string; 
  isDropdownOpen = false;
  constructor(private _observer: BreakpointObserver, public dialog: MatDialog,private _router:Router) { }

  ngOnInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  navigateToShortsUpload() {
    this._router.navigate(['/home/shorts-upload']);
  }

  navigateToUserProfile() {
    this._router.navigate(['/home/user-profile']);
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log('Searching for:', searchTerm);
    // Implement your search logic here
  }
  toggleMenu() {
   
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openSearchBox() {
    this.searchBar = true
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(UploadVideoComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  openUploadAudioDialog() {
   const dialogRef = this.dialog.open(AudioUploadDialogComponent,{
    height:'auto',
    width:'400px'
   })
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  }


}
