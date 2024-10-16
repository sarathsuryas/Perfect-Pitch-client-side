import { Component } from '@angular/core';




@Component({
  selector: 'app-testnav',
  templateUrl: './testnav.component.html',
  styleUrls: ['./testnav.component.css']
})
export class TestnavComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
