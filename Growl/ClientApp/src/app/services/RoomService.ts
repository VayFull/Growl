import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IRoom } from "../rooms/IRoom";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class RoomService {
  url: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {
    this.url = "https://localhost:44372/" + "api/Rooms/";
  }

  getAllRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.url);
  }

  createRoom(room: IRoom): Observable<IRoom> {
    room.login = sessionStorage.getItem("user");
    return this.http.post<IRoom>(this.url, room, this.httpOptions);
  }

  getRoomById(roomid: number): Observable<IRoom> {
    return this.http.get<IRoom>(this.url+roomid);
  }
}
