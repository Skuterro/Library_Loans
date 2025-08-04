using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models.Entities
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Author { get; set; }
        public short? ReleaseYear { get; set; }

        public ICollection<Loan> Loans { get; set; } = new List<Loan>();
    }
}
