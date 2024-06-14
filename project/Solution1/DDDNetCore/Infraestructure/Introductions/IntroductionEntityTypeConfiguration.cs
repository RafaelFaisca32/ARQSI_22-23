using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Introductions;

namespace DDDSample1.Infrastructure.Introductions
{
    internal class IntroductionEntityTypeConfiguration : IEntityTypeConfiguration<Introduction>
    {
        public void Configure(EntityTypeBuilder<Introduction> builder)
        {
            //builder.ToTable("Introduction", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.HasOne(b => b.Requester).WithMany();// b => b.Requester, p => { p.Property(b => b.Id).IsRequired(); });
            //builder.HasOne(b => b.CommonFriend).WithMany();
            //builder.HasOne(b => b.Friend).WithMany();
            //builder.OwnsOne(b => b.CommonFriend, p => { p.Property(b => b.Id).IsRequired(); });
            //builder.OwnsOne(b => b.Friend, p => { p.Property(b => b.Id).IsRequired(); });


            builder.OwnsOne(b => b.Requester, p => { p.Property(b => b.FriendId1).IsRequired(); });
            builder.OwnsOne(b => b.CommonFriend, p => { p.Property(b => b.FriendId1).IsRequired(); });
            builder.OwnsOne(b => b.Friend, p => { p.Property(b => b.FriendId1).IsRequired(); });

            builder.OwnsOne(b => b.State, s =>{s.Property(b => b.State1).IsRequired();});           
            builder.OwnsOne(b => b.Date, bi => {bi.Property(b => b.Date1).IsRequired(); });


            

            //builder.OwnsOne(b => b.State, p => { p.Property(b => b.State1).IsRequired(); });
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}