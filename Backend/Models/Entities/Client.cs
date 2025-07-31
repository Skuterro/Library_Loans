using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        public ICollection<Book> LoanedBooks { get; set; } = new List<Book>();
    }
}
