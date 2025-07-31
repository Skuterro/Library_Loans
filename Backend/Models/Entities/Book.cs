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
        public string? Author { get; set; } = string.Empty;
        public short? ReleaseYear { get; set; }
        public int? ClientId { get; set; }

        [ForeignKey("ClientId")]
        public Client? Client { get; set; }
        public DateTime? LoanDate { get; set; }
    }
}
