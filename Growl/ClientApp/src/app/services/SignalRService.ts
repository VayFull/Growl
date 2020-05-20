import * as signalR from "@aspnet/signalr";
import { Injectable } from "@angular/core";
import { Circle } from "../room/circle";
import { timer } from "rxjs";
import { userScore } from "../json-objects/UserScore";

@Injectable({
  providedIn: 'root'
})

export class SignalRService {

  private hubConnection: signalR.HubConnection
  private circles = new Array<Circle>();
  public startConnection = (id: number, login: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://growl.azurewebsites.net/chat`)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.hubConnection.on('sendmessage', (login: string, message: string) => {
          var now: Date = new Date();
          var textarea = document.getElementById("messages") as HTMLTextAreaElement;
          var seconds = now.getSeconds();
          var stringSeconds = "";
          if (seconds < 10) {
            stringSeconds = `0${seconds}`;
          }
          else {
            stringSeconds = seconds.toString();
          }
          textarea.value += `\n${now.getHours()}:${now.getMinutes()}:${stringSeconds} ${login}:${message}`;
        });

        this.hubConnection.on('notificationmessage', (login: string, message: string) => {
          var now: Date = new Date();
          var textarea = document.getElementById("messages") as HTMLTextAreaElement;
          var seconds = now.getSeconds();
          var stringSeconds = "";
          if (seconds < 10) { // запилить для минут и часов
            stringSeconds = `0${seconds}`;
          }
          else {
            stringSeconds = seconds.toString();
          }
          textarea.value += `\n${now.getHours()}:${now.getMinutes()}:${stringSeconds} оповещения:${message}`;
        });
        this.addToGroup(login, id);

        this.hubConnection.on('userjoin', (login: string, jsonString: string) => {
          var scoreList = document.getElementById("score") as HTMLUListElement;
          let userScores: Array<userScore> = JSON.parse(jsonString);

          var old = document.getElementsByClassName("score-player");

          while (old[0]) {
            old[0].parentNode.removeChild(old[0]);
          }
          userScores.sort((a, b) => b.Score - a.Score);

          userScores.forEach((value) => {
            var listElement = document.createElement("li");
            if (login == value.Login) {
              listElement.setAttribute("class", "score-player-playing");
            }
            listElement.setAttribute("class", "score-player");
            var score = document.createElement("span");
            score.id = `${value.Login}score`;
            score.innerHTML = value.Score.toString();
            listElement.id = `${value.Login}name`;
            listElement.innerHTML = value.Login + " : ";
            listElement.append(score);
            scoreList.appendChild(listElement);
          });
        });

        this.hubConnection.on("userdisconnect", (login: string) => {
          var toRemove = document.getElementById(`${login}name`) as HTMLUListElement;
          toRemove.remove();
        });

        this.hubConnection.on("oncirclecreate", (xPos: number, yPos: number, radius: number) => {
          let canvas = document.getElementById('canvas') as HTMLCanvasElement;
          let ctx = canvas.getContext('2d');
          let circle = new Circle(radius, xPos, yPos);

          this.circles.push(circle);

          ctx.beginPath();
          ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'red';
          ctx.fill();
        });

        this.hubConnection.on("startgame", (frequency: number, numberOfCircles: number, radius: number, roomId: number, canvasWidth: number,
          canvasHeight: number, roomCreator: string) => {
          let canvas = document.getElementById('canvas') as HTMLCanvasElement;
          canvas.hidden = false;
          let ctx = canvas.getContext('2d');
          canvas.setAttribute('width', `${canvasWidth}`);
          canvas.setAttribute('height', `${canvasHeight}`);
          var btn = document.getElementById('startgamebtn');
          if(btn!=null)
            btn.hidden = true;
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          if (sessionStorage.getItem("user") == roomCreator) {
            var createdCircles = 0;
            var interval = setInterval(() => {
              this.createCircle(radius, roomId, canvasWidth, canvasHeight);
              createdCircles++;
              if (createdCircles == numberOfCircles + 1) {
                clearInterval(interval);
                this.finishGame(frequency, numberOfCircles, radius, roomId, canvasWidth, canvasHeight, roomCreator, login);
              }
            }, frequency);
          }

          canvas.addEventListener('click', (event) => {
            let x = event.pageX - canvas.offsetLeft;
            let y = event.pageY - canvas.offsetTop;

            this.circles.forEach((value) => {
              if (this.isInside(value, x, y)) {
                const index = this.circles.indexOf(value, 0);
                if (index > -1) {
                  this.circles.splice(index, 1);
                  this.removeCircle(value, roomId, sessionStorage.getItem("user"));//удаление круга с сервера
                }

                let counterElement = document.getElementById('count') as HTMLParagraphElement;
                let previous = Number.parseInt(counterElement.innerHTML);
                counterElement.innerHTML = (previous + 1).toString();
              };
            });
          }, false);
        });

        this.hubConnection.on("onremovecircle", (login: string, xPos: number, yPos: number, radius: number, jsonString: string) => {
          let canvas = document.getElementById('canvas') as HTMLCanvasElement;
          let ctx = canvas.getContext('2d');
          ctx.beginPath();
          ctx.arc(xPos, yPos, radius + 0.7, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'black';
          ctx.fill();

          var scoreList = document.getElementById("score") as HTMLUListElement;
          let userScores: Array<userScore> = JSON.parse(jsonString);

          var old = document.getElementsByClassName("score-player");

          while (old[0]) {
            old[0].parentNode.removeChild(old[0]);
          }

          userScores.sort((a, b) => b.Score - a.Score);

          userScores.forEach((value) => {
            var listElement = document.createElement("li");
            if (login == value.Login) {
              listElement.setAttribute("class", "score-player-playing");
            }
            listElement.setAttribute("class", "score-player");
            var score = document.createElement("span");
            score.id = `${value.Login}score`;
            score.innerHTML = value.Score.toString();
            listElement.id = `${value.Login}name`;
            listElement.innerHTML = value.Login + " : ";
            listElement.append(score);
            scoreList.appendChild(listElement);
          });
        });

        this.hubConnection.on("finishgame", (frequency: number, numberOfCircles: number, radius: number, roomId: number, canvasWidth: number,
          canvasHeight: number, roomCreator: string, login: string) => {
          login = sessionStorage.getItem("user");
          var canvas = document.getElementById("canvas");
          canvas.hidden = true;
          var restartMenu = document.getElementById("endmenu");
          restartMenu.hidden = false;
          if (roomCreator == login) {
            var button = document.createElement("button");
            restartMenu.append(button);
            button.id = "restartGameButton";
            button.className = "btn-primary";
            button.innerHTML = "рестарт";
            button.addEventListener("click", () => {
              this.startGame(roomId, numberOfCircles, frequency, radius, canvasWidth, canvasHeight, roomCreator);
            });
          }
        });
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  private addToGroup(login: string, id: number) {
    this.hubConnection.invoke("AddToGroup", login, id);
  }

  public createCircle(radius: number, roomId: number, canvasWidth: number, canvasHeight: number) {
    this.hubConnection.invoke("CreateCircle", radius, roomId, canvasWidth, canvasHeight);
  }

  public finishGame(frequency: number, numberOfCircles: number, radius: number, roomId: number, canvasWidth: number,
    canvasHeight: number, roomCreator: string, login: string) {
    this.hubConnection.invoke("FinishGame", roomId, numberOfCircles, frequency, radius, canvasWidth, canvasHeight, roomCreator, login);
  }

  public removeCircle(circle: Circle, roomId: number, login: string) {
    this.hubConnection.invoke("RemoveCircle", circle.xPos, circle.yPos, circle.radius, roomId, login);
  }

  public sendMessage(login: string, message: string, roomId: number) {
    this.hubConnection.invoke("SendToRoom", login, message, roomId).catch(err => console.error(err)).then(() => {
      var textarea = document.getElementById("message") as HTMLTextAreaElement;
      textarea.value = "";
    });
  }

  private isInside(circle: Circle, xMousePos: number, yMousePos: number) {
    let dx = xMousePos - circle.xPos;
    let dy = yMousePos - circle.yPos;

    let r = Math.sqrt(dx * dx + dy * dy);

    if (r <= circle.radius) {
      return true;
    }
    else {
      return false;
    }
  }

  public restartGame(roomId: number, numberOfCircles: number, frequency: number, radius: number, canvasWidth: number, canvasHeight: number, roomCreator: string,
  login: string) {
    this.hubConnection.invoke("RestartGame", roomId, numberOfCircles, frequency, radius, canvasWidth, canvasHeight, roomCreator, login)
  }

  public startGame(roomId: number, numberOfCircles: number, frequency: number, radius: number, canvasWidth: number, canvasHeight: number, roomCreator: string) {
    var restartGameButton = document.getElementById("restartGameButton");
    if (restartGameButton != null)
      restartGameButton.remove();
    var endMenu = document.getElementById("endmenu");
    endMenu.hidden = true;
    var canvas = document.getElementById("canvas");
    canvas.hidden = false;
    this.hubConnection.invoke("StartGame", roomId, numberOfCircles, frequency, radius, canvasWidth, canvasHeight, roomCreator);
  }
}

