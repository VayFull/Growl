using Growl.Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Timers;

namespace Growl.Hubs
{
    public class ChatHub : Hub
    {
        private static List<Circle> _circles = new List<Circle>();
        private static Dictionary<string, RoomConnection> _chatUsers = new Dictionary<string, RoomConnection>();

        public Task SendToRoom(string login, string message, int roomId)
        {
            var groupName = $"room{roomId}";

            return Clients.Group(groupName).SendAsync("sendmessage", login, message);
        }

        public async Task AddToGroup(string login, int roomId)
        {
            var groupName = $"room{roomId}";

            _chatUsers.Add(Context.ConnectionId, new RoomConnection { Score = 0, RoomId = roomId, Login = login, GroupName = groupName });

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var listOfScores = new List<UserScore>();
            foreach (var key in _chatUsers)
            {
                if (key.Value.RoomId == roomId)
                {
                    listOfScores.Add(new UserScore { Login = key.Value.Login, Score = key.Value.Score });
                }
            }

            var jsonString = JsonSerializer.Serialize(listOfScores);

            await Clients.Group(groupName).SendAsync("userjoin", login, jsonString);

            await Clients.Group(groupName).SendAsync("notificationmessage", login, $"{login} присоединился!");
        }

        public async Task CreateCircle(int radius, int roomId, int canvasWidth, int canvasHeight)
        {
            var groupName = $"room{roomId}";

            var maxX = canvasWidth - radius;
            var maxY = canvasHeight - radius;

            var minX = 0 + radius;
            var minY = 0 + radius;

            var randX = (int)Math.Round(new Random().NextDouble() * (maxX - minX) + minX);
            var randY = (int)Math.Round(new Random().NextDouble() * (maxY - minY) + minY);

            _circles.Add(new Circle(radius, randX, randY, roomId));

            await Clients.Group(groupName).SendAsync("oncirclecreate", randX, randY, radius);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var info = _chatUsers[Context.ConnectionId];
            await Clients.Group(info.GroupName).SendAsync("userdisconnect", info.Login);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, info.GroupName);
            await Clients.Group(info.GroupName).SendAsync("notificationmessage", info.Login, $"{info.Login} отсоединился!");
            _chatUsers.Remove(Context.ConnectionId);

        }

        public async Task StartGame(int roomId, int numberOfCircles, int frequency, int radius, int canvasWidth, int canvasHeight, string roomCreator)
        {
            _circles.RemoveAll(x => x.RoomId == roomId);
            var keys = _chatUsers.Where(x => x.Value.RoomId == roomId).Select(x => x.Key).ToList();
            foreach (var key in keys)
            {
                _chatUsers[key].Score = 0;
            }
            var groupName = $"room{roomId}";
            await Clients.Group(groupName).SendAsync("startgame", frequency, numberOfCircles, radius, roomId, canvasWidth, canvasHeight, roomCreator);
        }

        public async Task RestartGame(int roomId, int numberOfCircles, int frequency, int radius, int canvasWidth, int canvasHeight, string roomCreator, string login)
        {
            var groupName = $"room{roomId}";
            await Clients.Group(groupName).SendAsync("restartgame", frequency, numberOfCircles, radius, roomId, canvasWidth, canvasHeight, roomCreator, login);
        }

        public async Task FinishGame(int roomId, int numberOfCircles, int frequency, int radius, int canvasWidth, int canvasHeight, string roomCreator, string login)
        {
            var groupName = $"room{roomId}";
            await Clients.Group(groupName).SendAsync("finishgame", frequency, numberOfCircles, radius, roomId, canvasWidth, canvasHeight, roomCreator, login);
        }

        public async Task RemoveCircle(int xPos, int yPos, int radius, int roomId, string user)
        {
            var groupName = $"room{roomId}";
            var circle = _circles.Where(x => x.Radius == radius && x.RoomId == roomId && x.XPos == xPos && x.YPos == yPos).FirstOrDefault();
            if (circle != null)
            {
                _circles.Remove(circle);
                _chatUsers[Context.ConnectionId].Score++;
            }

            var listOfScores = new List<UserScore>();
            foreach (var key in _chatUsers)
            {
                if (key.Value.RoomId == roomId)
                {
                    listOfScores.Add(new UserScore { Login = key.Value.Login, Score = key.Value.Score });
                }
            }

            var jsonString = JsonSerializer.Serialize(listOfScores);

            await Clients.Group(groupName).SendAsync("onremovecircle", user, xPos, yPos, radius, jsonString);
        }
    }
}
