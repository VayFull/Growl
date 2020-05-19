using Growl.Data.Contexts;
using Growl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Growl.Data.Repositories
{
    public class RoomRepository : IRepository<Room>
    {
        private readonly GrowlDbContext _context;
        public RoomRepository(GrowlDbContext context)
        {
            _context = context;
        }
        public List<Room> GetList()
        {
            return _context.Rooms.ToList();
        }

        public Room GetById(long id)
        {
            return _context.Rooms.Find(id);
        }

        public void Create(Room item)
        {
            _context.Rooms.Add(item);
            Save();
        }

        public void Update(Room item)
        {
            _context.Entry(item).State = EntityState.Modified;
        }

        public void DeleteById(long id)
        {
            var item = GetById(id);
            if (item != null)
                _context.Rooms.Remove(item);
            Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
