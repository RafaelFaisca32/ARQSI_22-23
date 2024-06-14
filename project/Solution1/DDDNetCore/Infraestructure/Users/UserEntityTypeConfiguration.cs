using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Users;

namespace DDDSample1.Infrastructure.Users
{
    internal class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //builder.ToTable("User", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.Password, p =>
        {
            p.Property(b => b.Pass)
                .IsRequired();
        });

            builder.OwnsOne(b => b.BirthDate, bi =>
        {
            bi.Property(b => b.birthD)
                .IsRequired();
        });       

            builder.OwnsOne(b => b.Email, e =>
        {
            e.Property(b => b.Address)
                .IsRequired();
        });

            builder.OwnsOne(b => b.Name, n =>
        {
            n.Property(b => b.Name1)
                .IsRequired();
        });


             builder.OwnsOne(b => b.PhoneNumber, ph =>
        {
            ph.Property(b => b.Number)
                .IsRequired();
        });

             builder.OwnsOne(b => b.State, s =>
        {
            s.Property(b => b.State1)
                .IsRequired();
        });
            

             builder.OwnsMany(b => b.Tag, t =>
        {
            t.Property(b => b.Tag1)
                .IsRequired();
        });
             builder.OwnsMany(b => b.Friendship, t =>
             {
                 t.Property(b => b.FriendId1)
                     .IsRequired();
             });
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}