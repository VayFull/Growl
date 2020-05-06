import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IRoom } from '../rooms/IRoom';
import { RoomService } from '../services/RoomService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  isCreatingRoom: boolean;
  Rooms: Observable<Array<IRoom>>
  constructor(private router: Router, public roomService: RoomService)
  {
    
  }

  newRoom: IRoom = {} as IRoom;

  ngOnInit() {
    var arr;
    this.Rooms = this.roomService.getAllRooms();
    this.isCreatingRoom = false;
    this.newRoom.isPrivate = false;
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(['login']);
    }
  }

  createRoom() {
    if (this.newRoom.isPrivate==true) {
      this.newRoom.password = this.newRoom.password;
    }
    else {
      this.newRoom.isPrivate = false;
      this.newRoom.password = "";
    }
    this.newRoom.name = this.newRoom.name;
    this.newRoom.id = 0;
    this.newRoom.circleNumber = this.newRoom.circleNumber;
    this.newRoom.frequency = this.newRoom.frequency;
    this.newRoom.circleRadius = this.newRoom.circleRadius;

    this.roomService.createRoom(this.newRoom).subscribe(data => {
      alert("комната успешно создана!");
      this.Rooms = this.roomService.getAllRooms();
      this.isCreatingRoom = false;
    }, error => alert("Что-то пошло не так"));
  }
}
