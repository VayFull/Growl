using Growl.Controllers;
using Growl.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Growl.Tests
{
    public class RoomsControllerTests : IClassFixture<ContextFixture>
    {
        public ContextFixture Context { get; set; }
        public RoomsControllerTests(ContextFixture sharedDatabase)
        {
            Context = sharedDatabase;
        }

        [Fact]
        public async void Try_Get_Rooms()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new RoomsController(context);
                var gotRooms = await controller.GetRooms();
                var rooms = context.Rooms;
                Assert.Equal(rooms.ToList(), gotRooms.Value.ToList());
            }
        }

        [Fact]
        public async void Try_Get_Room()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new RoomsController(context);
                var randomId = new Random().Next();
                var room = context.Rooms.Where(x => x.Id == randomId).FirstOrDefault();
                var gotRoom = await controller.GetRoom(randomId);
                if (room != null)
                {
                    Assert.Equal(room, gotRoom);
                }
                else
                {
                    var code = (StatusCodeResult)gotRoom.Result;
                    Assert.Equal(404, code.StatusCode);
                }
            }
        }

        [Fact]
        public async void Try_Add_Room()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new RoomsController(context);
                var room = new Room { CircleNumber = 50, CircleRadius = 25, IsPrivate = false, Frequency = 400, Name = "SomeRoom", Login = "someUser" };
                var previousCount = context.Rooms.Count();
                await controller.PostRoom(room);
                var currentCount = context.Rooms.Count();
                Assert.Equal(previousCount + 1, currentCount);
            }
        }
    }
}
