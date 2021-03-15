using Microsoft.EntityFrameworkCore;
using PenaltyCalculation.Entities;

namespace PenaltyCalculation.DBContext
{
    public class PenaltyDBContext : DbContext
    {
        public PenaltyDBContext(DbContextOptions<PenaltyDBContext> options) : base(options)
        {

        }
        public virtual DbSet<Country> Countries{get;set;}
        public virtual DbSet<Holiday> Holidays{get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder){

            modelBuilder.Entity<Holiday>()
                        .HasOne(c=>c.Country)
                        .WithMany(h=>h.Holidays);
            
        }
    }
}