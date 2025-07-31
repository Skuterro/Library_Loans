using Backend.Models.Responses.ClientResponses;

namespace Backend.Models.Responses.BookResponses
{
    public class BookResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public short ReleaseYear { get; set; }
        public SimpleClientResponseDto? LoanedBy { get; set; }
        public DateTime? LoanDate { get; set; }
    }
}
