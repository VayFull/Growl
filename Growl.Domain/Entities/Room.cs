using System;
using System.Collections.Generic;
using System.Text;

namespace Growl.Domain.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsPrivate { get; set; }
        public string Password { get; set; }
        public DateTime CreatedTime { get; set; } = DateTime.Now;
        public float Frequency { get; set; }
        public int CircleNumber { get; set; }
        public int CircleRadius { get; set; }
        public string Login { get; set; }
    }
}
