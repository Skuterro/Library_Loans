using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.BookRequests
{
    public class BookCreateDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MaxLength(50, ErrorMessage = "Title cannot exceed 50 characters.")]
        public string Title { get; set; } = null!;

        [MaxLength(100, ErrorMessage = "The author's full name cannot exceed 100 characters.")]
        public string Author { get; set; } = string.Empty;
        public short ReleaseYear { get; set; }
    }
}
