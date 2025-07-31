using Backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Client>()
                .HasMany(client => client.LoanedBooks)
                .WithOne(book  => book.Client)
                .HasForeignKey(book => book.ClientId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Client>()
                .HasIndex(client => client.Email)
                .IsUnique();

            modelBuilder.Entity<Book>()
                .HasIndex(book => book.Title)
                .IsUnique();
        }
    }
}
