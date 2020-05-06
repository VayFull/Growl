import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserService } from './services/userService';
import { LogoutComponent } from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { RoomService } from './services/RoomService';
import { RoomComponent } from './room/room.component';
import { TestComponent } from './test/test.component';
import { SignalRService } from './services/SignalRService';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RoomsComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    AccountComponent,
    RoomComponent,
    TestComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'account', component: AccountComponent },
      { path: 'room/:id', component: RoomComponent },
      { path: 'test', component: TestComponent }
    ])
  ],
  providers: [UserService, RoomService, SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
