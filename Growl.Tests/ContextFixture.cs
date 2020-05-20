using Growl.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Growl.Tests
{
    public class ContextFixture
    {
        private static readonly object _lock = new object();
        private static bool _databaseInitialized;

        public ContextFixture()
        {
            Connection = new NpgsqlConnection(@"Host=localhost;Port=5432;Database=growl;Username=postgres;Password=1234QWER+");
            Seed();
            Connection.Open();
        }

        public DbConnection Connection { get; }

        public GrowlDbContext CreateContext(DbTransaction transaction = null)
        {
            var context = new GrowlDbContext(new DbContextOptionsBuilder<GrowlDbContext>().UseNpgsql(Connection).Options);

            if (transaction != null)
            {
                context.Database.UseTransaction(transaction);
            }

            return context;
        }

        private void Seed()
        {
            lock (_lock)
            {
                if (!_databaseInitialized)
                {
                    using (var context = CreateContext())
                    {
                        context.Database.EnsureDeleted();
                        context.Database.EnsureCreated();



                        context.SaveChanges();
                    }

                    _databaseInitialized = true;
                }
            }
        }

        public void Dispose() => Connection.Dispose();
    }
}
