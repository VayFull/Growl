import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../services/RoomService';
import { IRoom } from '../rooms/IRoom';
import { Observable, interval } from 'rxjs';
import { SignalRService } from '../services/SignalRService';
import { Circle } from './circle';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
  id: number;

  public room: IRoom = {} as IRoom;

  constructor(private route: ActivatedRoute, public roomService: RoomService, public signalRService: SignalRService, private router: Router) {
  }

  public sendMessage() {
    var login = sessionStorage.getItem("user");
    var textarea = document.getElementById('message') as HTMLTextAreaElement;
    var message = textarea.value;
    if (message != "" && message != "\n") {
      this.signalRService.sendMessage(login, message, this.id);
    }
    else {
      textarea.value = "";
    }
  }

  public exitRoom() {
    this.router.navigate(['rooms']);
  }

  keyDownFunction(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      this.sendMessage();
    }
    if (event.keyCode == 13 && event.shiftKey) {
      return false;
    }
  }

  autoScroll() {
    var textarea = document.getElementById("messages") as HTMLTextAreaElement;
    textarea.scrollTop = textarea.scrollHeight;
  }

  ngAfterViewChecked() {
    this.autoScroll();
  }

  ngAfterViewInit() {
    var window = document.getElementById('window');
    var button = document.getElementById('chatBtn');
    var span = document.getElementsByClassName("close")[0] as HTMLSpanElement;
    button.onclick = function () {
      window.style.display = "block";
    }
    span.onclick = function () {
      window.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == window) {
        window.style.display = "none";
      }
    }
  }

  initGame() {
    this.signalRService.startGame(this.id, this.room.circleNumber, this.room.frequency, this.room.circleRadius, 1500, 900, this.room.login);
    var btn = document.getElementById('startgamebtn');
    btn.hidden = true;
  }

  initChat() {
    this.signalRService.startConnection(this.id, sessionStorage.getItem("user"));
  }

  public CreateCircle(circles: Array<Circle>) {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.signalRService.createCircle(this.room.circleRadius, this.id, canvas.width, canvas.height);
  }

  ngOnInit() {
    if (sessionStorage.getItem("user") == null) {
      this.router.navigate(['login']);
    }
    this.id = + this.route.snapshot.paramMap.get('id');

    this.initChat();

    this.roomService.getRoomById(this.id).subscribe(x => {
      this.room = x;
    },
      error => console.log(error),
      () => {
        var startGameBtn = document.getElementById("startgamebtn");
        startGameBtn.className = "btn-primary";
        if (sessionStorage.getItem("user") != this.room.login) {
          startGameBtn.remove();
        }
      });
  }
}
