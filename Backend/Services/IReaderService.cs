using Backend.Models.Requests.ClientRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
using Backend.Models.Responses.LoanResponses;

namespace Backend.Services
{
    public interface IReaderService
    {
        Task<PagedResult<ReaderResponseDto>> GetAllReadersAsync(ReaderQueryParameters query);
        Task<ReaderResponseDto> GetReaderByIdAsync(int id);
        Task<IEnumerable<LoanResponseDto>> GetReaderLoansAsync(int id);
        Task<ReaderResponseDto> CreateReaderAsync(ReaderCreateDto clientDto);
        Task<ReaderResponseDto> UpdateReaderAsync(int id, ReaderUpdateDto updateDto);
        Task DeleteReaderAsync(int id);
        Task<bool> ReaderExistsAsync(int id);
    }
}
