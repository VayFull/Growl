import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(public userService:UserService) {}

  entry(login: string, password: string) {
    var user: User = { login, password } as User;
    this.userService
      .tryLogin(user).subscribe(ok => this.userService.authorize(user), err => alert("wrong"));
  }

  ngOnInit() {
  }
}
