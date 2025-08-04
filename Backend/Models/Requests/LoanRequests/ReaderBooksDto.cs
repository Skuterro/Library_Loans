using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.LoanRequests
{
    public class ReaderBooksDto
    {
        [Required(ErrorMessage = "The client Id is required")]
        public int readerId { get; set; }

    }
}
