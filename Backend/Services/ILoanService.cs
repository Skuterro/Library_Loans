using Backend.Models.Requests.LoanRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.LoanResponses;

namespace Backend.Services
{
    public interface ILoanService
    {
        Task<PagedResult<LoanResponseDto>> GetAllLoansAsync(LoansQueryParameters query);
        Task<LoanResponseDto> GetLoanByIdAsync(int id);
        Task<LoanResponseDto> LoanBookAsync(LoanBookDto loanBookDto);
        Task<LoanResponseDto> ReturnBookAsync(int loanId);
        Task<bool> IsBookLoanedAsync(int bookId);
    }
}
