import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit{
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
  isMobile= true;
  isCollapsed = true;
  searchBar:boolean = false

  constructor(private _observer: BreakpointObserver) {}

  ngOnInit() {
    this._observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
  openSearchBox() {
    this.searchBar = true
}

}
