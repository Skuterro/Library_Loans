using Backend.Models.Requests.BookRequests;
using Backend.Models.Responses.BookResponses;

namespace Backend.Services
{
    public interface IBookService
    {
        Task<IEnumerable<BookResponseDto>> GetAllBooksAsync();
        Task<BookResponseDto> GetBookByIdAsync(int id);
        Task<BookResponseDto> CreateBookAsync(BookCreateDto bookDto);
        Task<BookResponseDto> LoanBookAsync(int id, LoanBookDto loadnBookDto);
        Task<BookResponseDto> ReturnBookAsync(int id);
        Task<BookResponseDto> UpdateBookAsync(int id,  BookUpdateDto updateDto);
        Task DeleteBookAsync(int id);
    }
}
