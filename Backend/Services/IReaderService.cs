using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;

namespace Backend.Services
{
    public interface IReaderService
    {
        Task<IEnumerable<ReaderResponseDto>> GetAllReadersAsync();
        Task<ReaderResponseDto> GetReaderByIdAsync(int id);
        Task<IEnumerable<SimpleBookResponseDto>> GetReaderBooksAsync(int id);
        Task<ReaderResponseDto> CreateReaderAsync(ReaderCreateDto clientDto);
        Task<ReaderResponseDto> UpdateReaderAsync(int id, ReaderUpdateDto updateDto);
        Task DeleteReaderAsync(int id);
        Task<bool> ReaderExistsAsync(int id);
    }
}
