using Growl.Controllers;
using Growl.Domain.Entities;
using Growl.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace Growl.Tests
{
    public class UsersControllerTests : IClassFixture<ContextFixture>
    {
        public ContextFixture Context { get; set; }
        public UsersControllerTests(ContextFixture sharedDatabase)
        {
            Context = sharedDatabase;
        }

        [Fact]
        public async void Try_Get_User()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new UsersController(context, new HashService());
                var randomId = new Random().Next();
                var user = context.Users.Where(x => x.Id == randomId).FirstOrDefault();
                var gotUser = await controller.GetUser(randomId);
                if (user != null)
                {
                    Assert.Equal(user, gotUser);
                }
                else
                {
                    var code = (StatusCodeResult)gotUser.Result;
                    Assert.Equal(404, code.StatusCode);
                }
            }
        }

        [Fact]
        public async void Try_Add_Bad_User()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new UsersController(context, new HashService());
                var someBadUser = new User { Login = "", Password = null };
                var previousCount = context.Users.Count();
                await controller.PostUser(someBadUser);
                var currentCount = context.Users.Count();
                Assert.Equal(previousCount, currentCount);
            }
        }

        [Fact]
        public async void Try_Add_Okey_User()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new UsersController(context, new HashService());
                var someBadUser = new User { Login = "qwerty", Password = "password" };
                var previousCount = context.Users.Count();
                await controller.PostUser(someBadUser);
                var currentCount = context.Users.Count();
                Assert.Equal(previousCount + 1, currentCount);
            }
        }

        [Fact]
        public void Try_Fake_Authorize()
        {
            using (var context = Context.CreateContext())
            {
                var controller = new UsersController(context, new HashService());
                var user = new User { Password = "ertdrmoptgdmlp", Login = "fakeLogin" };
                var result = controller.TryLogin(user);
                var code = (StatusCodeResult)result;
                Assert.Equal(401, code.StatusCode);
            }
        }
    }
}
