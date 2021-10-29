using Microsoft.EntityFrameworkCore.Migrations;

namespace phieucan.Migrations
{
    public partial class updateBill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "Bill",
                newName: "Status");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Bill",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CarWeight",
                table: "Bill",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "GoodsWeight",
                table: "Bill",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "TotalWeight",
                table: "Bill",
                type: "decimal(18,3)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Bill");

            migrationBuilder.DropColumn(
                name: "CarWeight",
                table: "Bill");

            migrationBuilder.DropColumn(
                name: "GoodsWeight",
                table: "Bill");

            migrationBuilder.DropColumn(
                name: "TotalWeight",
                table: "Bill");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Bill",
                newName: "status");
        }
    }
}
