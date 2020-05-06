using System;
using System.Collections.Generic;
using System.Text;

namespace Growl.Domain.Entities
{
    public class RoomConnection
    {
        public int Score { get; set; }
        public int RoomId { get; set; }
        public string Login { get; set; }
        public string GroupName { get; set; }
    }
}
