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
import { Store } from '@ngrx/store';
import { getUserData, userSetTokenFromCookie } from 'src/app/store/user/user.action';
import { search } from 'src/app/store/search/search.action';
import { debounce, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})

export class UserMainComponent implements OnInit {
  searchQuery: any;
  selectedFilter: any;
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
  isPlayer: boolean = false
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  showMobileSearch: boolean = false;
  
  constructor(
    private _observer: BreakpointObserver,
    public dialog: MatDialog,
    private _router: Router,
    private _store: Store,
    private _messageService: MessageService,
    private _sharedService:SharedService
  ) { 
    
  }

  ngOnInit() {
    this._store.dispatch(getUserData())
   this._sharedService.data$.subscribe({
    next:(status)=>{
      this.isPlayer = status
    }
   })
  
  

    // this._observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
    //   if (screenSize.matches) {
    //     this.isMobile = true;
    //   } else {
    //     this.isMobile = false;
    //   }
    // });

    
    //   this._store.select(selectPlaylistSong).subscribe({
    //    next: (value) => {
    //     if (value.songId?.length === 0) {
    //       this.isPlayer = false
    //     } else {
    //       this.isPlayer = true
    //     }
    //   }, error: (err) => {
    //     console.log(err)
    //   }
    // })

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(query => {
        this._store.dispatch(search({ query }));
        if (this.selectedFilter === 'album') {
          this._router.navigate([`home/albums`]);
        } else if (this.selectedFilter === 'playlist') {
          this._router.navigate([`home/music-playlist`])
        } else if (this.selectedFilter === 'artist') {
          this._router.navigate(['home/artist-list'])
        } else if (this.selectedFilter === 'video') {
          this._router.navigate(['home/music-videos'])
        }
      });

  }



  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }


  navigateToShortsUpload() {
    this._router.navigate(['/home/shorts-upload']);
  }

  navigateToUserProfile() {
    this._router.navigate(['/home/user-profile']);
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



 

uploadVideo() {
  this._router.navigate(['home/upload-video'])
}

  openUploadAudioDialog() {
    const dialogRef = this.dialog.open(AudioUploadDialogComponent, {
      height: 'auto',
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  performSearch() {
    if (!this.selectedFilter) {
      this._messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'You have to select a filter for Search',
      });
      return
    }
    this.searchSubject.next(this.searchQuery);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
