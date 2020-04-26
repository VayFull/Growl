using System;
using System.Collections.Generic;
using System.Text;

namespace Subs.Domain.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public bool IsPrivate { get; set; }
        public string Name { get; set; }
        public int MaxPeople { get; set; }
        public int Frequent { get; set; }
        public int RoundTime { get; set; }    }
}
