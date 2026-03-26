using Microsoft.EntityFrameworkCore;
using AuthBackend.Models;

namespace AuthBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<LoginUser> LoginUsers { get; set; }
        public DbSet<RawAlarm> RawAlarms { get; set; }
        public DbSet<ConfiguredAlarm> ConfiguredAlarms { get; set; }
    }
}