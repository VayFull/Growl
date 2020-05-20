using Growl.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Growl.Tests
{
    public class HashServiceTests : IClassFixture<ContextFixture>
    {
        public ContextFixture Context { get; set; }
        public HashServiceTests(ContextFixture sharedDatabase)
        {
            Context = sharedDatabase;
        }

        [Fact]
        public void Try_Get_Hash()
        {
            var hashService = new HashService();
            var someString = DateTime.Now.ToString();
            var hash = hashService.GetHashString(someString);
            Assert.NotEqual(hash, someString);
        }
    }
}
