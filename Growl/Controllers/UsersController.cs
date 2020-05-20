using Growl.Data.Contexts;
using Growl.Domain.Entities;
using Growl.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Growl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly GrowlDbContext _context;
        private readonly HashService _hashService;

        public UsersController(GrowlDbContext context, HashService hashService)
        {
            _context = context;
            _hashService = hashService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [Route("getrole")]
        [HttpPost]
        public ActionResult<User> GetRole(User user)
        {
            var rightUser = _context.Users.Where(x => x.Login == user.Login).FirstOrDefault();
            return rightUser;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (string.IsNullOrEmpty(user.Login) || string.IsNullOrEmpty(user.Password))
                return BadRequest();

            if (user.Login == "admin")
                user.Role = "admin";
            else
                user.Role = "user";

            if (_context.Users.Any(x => x.Login == user.Login))
                return StatusCode(400);

            user.Password = _hashService.GetHashString(user.Password);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Route("trylogin")]
        [HttpPost]

        public ActionResult TryLogin(User user)
        {
            var rightUser = _context.Users.Where(x => x.Login == user.Login).FirstOrDefault();
            if (rightUser != null && rightUser.Password == _hashService.GetHashString(user.Password))
                return StatusCode(202);
            else
                return StatusCode(401);
        }
    }
}
