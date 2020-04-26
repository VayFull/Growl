using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Subs.Domain.Entities;
using Subs.Infrastructure.Contexts;

namespace Subs.Controllers
{
    [Authorize]
    public class GameController : Controller
    {
        private readonly RoomDbContext _context;
        public GameController(RoomDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            ViewBag.Rooms = _context.Rooms.ToList();
            return View();
        }

        [HttpPost]
        public IActionResult Index(Room model)
        {
            _context.Rooms.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Room", new { id = model.Id });
        }

        public IActionResult Room(long? id)
        {
            return View();
        }
    }
}