import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { UserService } from '../services/userService';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  login: string;
  password: string;
  test: string;
  constructor(public userService: UserService) {
  }

  add(login: string, password: string): void {
    var newUser: User = { login, password } as User;
    this.userService
      .createUser(newUser)
      .subscribe(data => {
        this.userService.authorize(newUser);
      },
        Error => { alert("failed while adding user") });
  }

  ngOnInit() {
  }

}
