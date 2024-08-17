import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  searchBar:boolean = false
  constructor(public breakpointObserver: BreakpointObserver) {
  }
  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width:768px)']).subscribe((state:BreakpointState)=>{
      if(state.matches){
        this.searchBar = false
      }
    })
  }

  
  openSearchBox() {
      this.searchBar = true
  }
  closeSearchBox() {
    this.searchBar = false
  }
  sideBarClose() {
    
  }


}

