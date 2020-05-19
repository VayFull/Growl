using System;
using System.Collections.Generic;
using System.Text;

namespace Growl.Services.interfaces
{
    public interface IHashService
    {
        public byte[] GetHash(string inputString);
        public string GetHashString(string inputString);
    }
}
