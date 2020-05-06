using Microsoft.EntityFrameworkCore.Migrations;

namespace Growl.Data.Migrations
{
    public partial class addedusertoroom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Login",
                table: "Rooms",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Login",
                table: "Rooms");
        }
    }
}
