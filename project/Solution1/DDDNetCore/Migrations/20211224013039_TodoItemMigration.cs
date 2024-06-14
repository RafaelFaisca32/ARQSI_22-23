using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class TodoItemMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Introductions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Requester_FriendId1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CommonFriend_FriendId1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Friend_FriendId1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State_State1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date_Date1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Introductions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password_Pass = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BirthDate_birthD = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name_Name1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber_Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State_State1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Friendships",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RelationTag_RelationTag1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConnectionStrength_Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RelationshipStrength_Number = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FriendAId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FriendBId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    FriendshipState_State1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friendships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friendships_Users_FriendAId",
                        column: x => x.FriendAId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Friendships_Users_FriendBId",
                        column: x => x.FriendBId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tag1 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => new { x.UserId, x.Id });
                    table.ForeignKey(
                        name: "FK_Tag_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users_Friendship",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FriendId1 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users_Friendship", x => new { x.UserId, x.Id });
                    table.ForeignKey(
                        name: "FK_Users_Friendship_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_FriendAId",
                table: "Friendships",
                column: "FriendAId");

            migrationBuilder.CreateIndex(
                name: "IX_Friendships_FriendBId",
                table: "Friendships",
                column: "FriendBId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friendships");

            migrationBuilder.DropTable(
                name: "Introductions");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Users_Friendship");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
