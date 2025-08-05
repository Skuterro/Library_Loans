using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;

namespace Backend.Models.Responses.LoanResponses
{
    public class LoanResponseDto
    {
        public int Id { get; set; }
        public SimpleBookResponseDto Book { get; set; } = null!;
        public ReaderResponseDto LoanedBy { get; set; } = null!;
        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set;  }
    }
}
