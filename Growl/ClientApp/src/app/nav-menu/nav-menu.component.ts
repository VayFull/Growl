import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  login: string;
  role: string;
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  getUser() {
    return sessionStorage.getItem("user");
  }

  getRole() {
    var user = this.getUser();
    var role = sessionStorage.getItem(user);
    return role;
  }
}
