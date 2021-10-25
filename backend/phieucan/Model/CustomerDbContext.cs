using Microsoft.EntityFrameworkCore;
using phieucan.Model;

namespace phieucan.Models
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customers{get;set;}
        public DbSet<Bill> Bill { get;set;}
    }
}
