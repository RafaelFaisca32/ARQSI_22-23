﻿// <auto-generated />
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(DDDSample1DbContext))]
    partial class DDDSample1DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("DDDSample1.Domain.Friendships.Friendship", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("FriendAId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FriendBId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("FriendAId");

                    b.HasIndex("FriendBId");

                    b.ToTable("Friendships");
                });

            modelBuilder.Entity("DDDSample1.Domain.Introductions.Introduction", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Introductions");
                });

            modelBuilder.Entity("DDDSample1.Domain.Users.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DDDSample1.Domain.Friendships.Friendship", b =>
                {
                    b.HasOne("DDDSample1.Domain.Users.User", "FriendA")
                        .WithMany()
                        .HasForeignKey("FriendAId");

                    b.HasOne("DDDSample1.Domain.Users.User", "FriendB")
                        .WithMany()
                        .HasForeignKey("FriendBId");

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.ConnectionStrength", "ConnectionStrength", b1 =>
                        {
                            b1.Property<string>("FriendshipId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Number")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("FriendshipId");

                            b1.ToTable("Friendships");

                            b1.WithOwner()
                                .HasForeignKey("FriendshipId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.FriendshipState", "FriendshipState", b1 =>
                        {
                            b1.Property<string>("FriendshipId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("State1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("FriendshipId");

                            b1.ToTable("Friendships");

                            b1.WithOwner()
                                .HasForeignKey("FriendshipId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.RelationTag", "RelationTag", b1 =>
                        {
                            b1.Property<string>("FriendshipId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("RelationTag1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("FriendshipId");

                            b1.ToTable("Friendships");

                            b1.WithOwner()
                                .HasForeignKey("FriendshipId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.RelationshipStrength", "RelationshipStrength", b1 =>
                        {
                            b1.Property<string>("FriendshipId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Number")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("FriendshipId");

                            b1.ToTable("Friendships");

                            b1.WithOwner()
                                .HasForeignKey("FriendshipId");
                        });

                    b.Navigation("ConnectionStrength");

                    b.Navigation("FriendA");

                    b.Navigation("FriendB");

                    b.Navigation("FriendshipState");

                    b.Navigation("RelationshipStrength");

                    b.Navigation("RelationTag");
                });

            modelBuilder.Entity("DDDSample1.Domain.Introductions.Introduction", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.ValueObjects.Date", "Date", b1 =>
                        {
                            b1.Property<string>("IntroductionId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Date1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroductionId");

                            b1.ToTable("Introductions");

                            b1.WithOwner()
                                .HasForeignKey("IntroductionId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.FriendId", "CommonFriend", b1 =>
                        {
                            b1.Property<string>("IntroductionId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("FriendId1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroductionId");

                            b1.ToTable("Introductions");

                            b1.WithOwner()
                                .HasForeignKey("IntroductionId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.FriendId", "Friend", b1 =>
                        {
                            b1.Property<string>("IntroductionId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("FriendId1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroductionId");

                            b1.ToTable("Introductions");

                            b1.WithOwner()
                                .HasForeignKey("IntroductionId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.FriendId", "Requester", b1 =>
                        {
                            b1.Property<string>("IntroductionId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("FriendId1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroductionId");

                            b1.ToTable("Introductions");

                            b1.WithOwner()
                                .HasForeignKey("IntroductionId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.State", "State", b1 =>
                        {
                            b1.Property<string>("IntroductionId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("State1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("IntroductionId");

                            b1.ToTable("Introductions");

                            b1.WithOwner()
                                .HasForeignKey("IntroductionId");
                        });

                    b.Navigation("CommonFriend");

                    b.Navigation("Date");

                    b.Navigation("Friend");

                    b.Navigation("Requester");

                    b.Navigation("State");
                });

            modelBuilder.Entity("DDDSample1.Domain.Users.User", b =>
                {
                    b.OwnsOne("DDDSample1.Domain.ValueObjects.BirthDate", "BirthDate", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("birthD")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.Email", "Email", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Address")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsMany("DDDSample1.Domain.ValueObjects.FriendId", "Friendship", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .UseIdentityColumn();

                            b1.Property<string>("FriendId1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId", "Id");

                            b1.ToTable("Users_Friendship");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.Name", "Name", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Name1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.Password", "Password", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Pass")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.PhoneNumber", "PhoneNumber", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("Number")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsOne("DDDSample1.Domain.ValueObjects.State", "State", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("State1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId");

                            b1.ToTable("Users");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.OwnsMany("DDDSample1.Domain.ValueObjects.Tag", "Tag", b1 =>
                        {
                            b1.Property<string>("UserId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .UseIdentityColumn();

                            b1.Property<string>("Tag1")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("UserId", "Id");

                            b1.ToTable("Tag");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("BirthDate");

                    b.Navigation("Email");

                    b.Navigation("Friendship");

                    b.Navigation("Name");

                    b.Navigation("Password");

                    b.Navigation("PhoneNumber");

                    b.Navigation("State");

                    b.Navigation("Tag");
                });
#pragma warning restore 612, 618
        }
    }
}
