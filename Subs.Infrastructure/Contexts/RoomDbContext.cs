using Microsoft.EntityFrameworkCore;
using Subs.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Subs.Infrastructure.Contexts
{
    public class RoomDbContext:DbContext
    {
        public DbSet<Room> Rooms { get; set; }
        public RoomDbContext(DbContextOptions<RoomDbContext> options):base(options)
        {

        }
    }
}
