using Backend.Models.Responses.BookResponses;

namespace Backend.Models.Responses.ClientResponses
{
    public class ReaderResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
