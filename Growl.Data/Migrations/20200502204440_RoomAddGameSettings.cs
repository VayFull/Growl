using Microsoft.EntityFrameworkCore.Migrations;

namespace Growl.Data.Migrations
{
    public partial class RoomAddGameSettings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Frequency",
                table: "Rooms",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfCircles",
                table: "Rooms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RadiusOfCircle",
                table: "Rooms",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Frequency",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "NumberOfCircles",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RadiusOfCircle",
                table: "Rooms");
        }
    }
}
