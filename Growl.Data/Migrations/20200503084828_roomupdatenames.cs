using Microsoft.EntityFrameworkCore.Migrations;

namespace Growl.Data.Migrations
{
    public partial class roomupdatenames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfCircles",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "RadiusOfCircle",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "CircleNumber",
                table: "Rooms",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CircleRadius",
                table: "Rooms",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CircleNumber",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "CircleRadius",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfCircles",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RadiusOfCircle",
                table: "Rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
