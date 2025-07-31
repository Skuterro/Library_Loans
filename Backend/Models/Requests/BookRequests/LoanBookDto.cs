using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.BookRequests
{
    public class LoanBookDto
    {
        [Required(ErrorMessage = "The client Id is required")]
        public int ClientId { get; set; }
    }
}
