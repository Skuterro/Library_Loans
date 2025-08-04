using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.LoanRequests
{
    public class LoanBookDto
    {
        [Required(ErrorMessage = "The client Id is required")]
        public int readerId { get; set; }

        [Required(ErrorMessage = "The book Id is required")]
        public int bookId { get; set; }
    }
}
