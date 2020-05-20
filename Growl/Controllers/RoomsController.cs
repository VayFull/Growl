using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Growl.Data.Contexts;
using Growl.Domain.Entities;
using Growl.Data.Repositories;

namespace Growl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly GrowlDbContext _context;
        private readonly RoomRepository _repository;

        public RoomsController(GrowlDbContext context)
        {
            _context = context;
            _repository = new RoomRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            return await _context.Rooms.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);

            if (room == null)
                return NotFound();

            return room;
        }

        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(Room room)
        {
            if (String.IsNullOrEmpty(room.Name))
            {
                return BadRequest();
            }
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoom", new { id = room.Id }, room);
        }
    }
}
