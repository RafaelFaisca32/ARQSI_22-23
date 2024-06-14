using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Friendships;

namespace DDDSample1.Infrastructure.Friendships
{
    internal class FriendshipEntityTypeConfiguration : IEntityTypeConfiguration<Friendship>
    {
        public void Configure(EntityTypeBuilder<Friendship> builder)
        {
            //builder.ToTable("Friendship", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.RelationTag, p => { p.Property(b => b.RelationTag1).IsRequired(); });
            builder.OwnsOne(b => b.ConnectionStrength, p => { p.Property(b => b.Number).IsRequired(); });
            builder.OwnsOne(b => b.RelationshipStrength, p => { p.Property(b => b.Number).IsRequired(); });
            builder.HasOne((b => b.FriendA));
            builder.HasOne((b => b.FriendB));
            builder.OwnsOne(b => b.FriendshipState, p => { p.Property(b => b.State1).IsRequired(); });
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}