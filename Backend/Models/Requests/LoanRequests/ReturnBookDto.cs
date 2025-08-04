using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.LoanRequests
{
    public class ReturnBookDto
    {
        [Required(ErrorMessage = "The book Id is required")]
        public int bookId { get; set; }
    }
}
