using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class Loan
    {
        [Key]
        public int Id { get; set; }

        public int ReaderId { get; set; }
        public Reader Reader { get; set; } = null!;

        public int BookId { get; set; }
        public Book Book { get; set; } = null!;

        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set; }
    }
}
