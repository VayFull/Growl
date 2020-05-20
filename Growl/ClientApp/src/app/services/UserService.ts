import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, private router: Router) {
    this.url = "https://localhost:44372/" + "api/users/";
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(userid: string): Observable<User> {
    return this.http.get<User>(this.url);
  }

  tryLogin(user: User): Observable<HttpResponse<any>> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>(this.url + "trylogin/", user, { observe: 'response', headers:headers });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.httpOptions);
  }

  updateUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<User>(this.url,
      user, httpOptions);
  }

  deleteUserById(userid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + userid,
      httpOptions);
  }

  authorize(user: User) {
    this.getUserWithRole(user).subscribe(data => {
      sessionStorage.setItem("user", user.login);
      sessionStorage.setItem(user.login, data.role);
      this.router.navigate(['/rooms']);
    });
    
  }

  getUserWithRole(user: User): Observable<User> {
    return this.http.post<User>(this.url + "getrole/", user, this.httpOptions);
  }
}  
