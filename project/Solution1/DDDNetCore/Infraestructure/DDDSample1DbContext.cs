using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.Friendships;
using DDDSample1.Domain.Introductions;
using DDDSample1.Infrastructure.Users;
using DDDSample1.Infrastructure.Friendships;
using DDDSample1.Infrastructure.Introductions;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {

        public DbSet<User> Users { get; set; }

        public DbSet<Friendship> Friendships { get; set; }

        public DbSet<Introduction> Introductions { get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FriendshipEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new IntroductionEntityTypeConfiguration());
        }
    }
}