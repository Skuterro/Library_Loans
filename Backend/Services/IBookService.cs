using Backend.Models.Requests.BookRequests;
using Backend.Models.Responses.BookResponses;

namespace Backend.Services
{
    public interface IBookService
    {
        Task<IEnumerable<BookResponseDto>> GetAllBooksAsync();
        Task<IEnumerable<SimpleBookResponseDto>> GetAvailableBooksAsync();
        Task<SimpleBookResponseDto> GetBookByIdAsync(int id);
        Task<SimpleBookResponseDto> CreateBookAsync(BookCreateDto bookDto);
        Task<SimpleBookResponseDto> UpdateBookAsync(int id,  BookUpdateDto updateDto);
        Task DeleteBookAsync(int id);
        Task<bool> BookExistsAsync(int id);
    }
}
