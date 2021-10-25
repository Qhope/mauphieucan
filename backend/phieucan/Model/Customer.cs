﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace phieucan.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId {  get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string CustomerName {  get; set; }
    }
}