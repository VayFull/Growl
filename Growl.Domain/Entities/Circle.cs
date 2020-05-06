using System;
using System.Collections.Generic;
using System.Text;

namespace Growl.Domain.Entities
{
    public class Circle
    {
        public int Radius { get; set; }
        public int XPos { get; set; }
        public int YPos { get; set; }
        public int RoomId { get; set; }

        public Circle(int radius, int xPos, int yPos, int roomId)
        {
            this.Radius = radius;
            this.XPos = xPos;
            this.YPos = yPos;
            this.RoomId = roomId;
        }
    }
}
