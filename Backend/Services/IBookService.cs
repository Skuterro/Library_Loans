using Backend.Models.Requests.BookRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.BookResponses;

namespace Backend.Services
{
    public interface IBookService
    {
        Task<PagedResult<BookResponseDto>> GetAllBooksAsync(BookQueryParameters query);
        Task<IEnumerable<SimpleBookResponseDto>> GetAvailableBooksAsync();
        Task<SimpleBookResponseDto> GetBookByIdAsync(int id);
        Task<SimpleBookResponseDto> CreateBookAsync(BookCreateDto bookDto);
        Task<SimpleBookResponseDto> UpdateBookAsync(int id,  BookUpdateDto updateDto);
        Task DeleteBookAsync(int id);
        Task<bool> BookExistsAsync(int id);
    }
}
