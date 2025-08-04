using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Requests.ClientRequests
{
    public class ReaderCreateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MaxLength(50, ErrorMessage = "Name cannot exceed 50 characters.")]
        public string Name { get; set; } = null!;

        [Required(ErrorMessage = "Last name is required.")]
        [MaxLength(50, ErrorMessage = "Last name cannot exceed 50 characters.")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Emial is required.")]
        [EmailAddress(ErrorMessage = "Incorrect email format.")]
        [MaxLength(50, ErrorMessage = "Email cannot exceed 50 characters.")]
        public string Email { get; set; } = null!;
    }
}
