using phieucan.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace phieucan.Model
{
    public class Bill
    {
        [Key]
        public int Id {  get; set; }

        public int CustomerId {  get; set; }
        public Customer Customer {  get; set; }

        [Column(TypeName = "varchar(15)")]
        public string PhoneTake { get; set; }

        [Column(TypeName ="varchar(15)")]
        public string PhoneBuy {  get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Driver { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string CarNumber {  get; set; }
        [Column(TypeName ="decimal(18,3)")]
        public decimal GoodsWeight { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal CarWeight { get; set; }
        [Column(TypeName = "decimal(18,3)")]
        public decimal TotalWeight { get; set; }
        [Column(TypeName ="decimal(18,3)")]
        public decimal Price {  get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal Amount { get; set; }

        public bool Status {  get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string ProductName {  get; set; }

        [Column(TypeName ="datetime")]
        public DateTime DateTime {  get; set; }

    }
}
