using Backend.Models.Requests.LoanRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.LoanResponses;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/api/loans")]
    public class LoansController : ControllerBase
    {
        private readonly ILoanService _loanService;

        public LoansController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<LoanResponseDto>>> GetAllLoans([FromQuery] LoansQueryParameters query)
        {
            var loans = await _loanService.GetAllLoansAsync(query);
            return Ok(loans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LoanResponseDto>> GetLoanById([FromRoute] int id)
        {
            var loan = await _loanService.GetLoanByIdAsync(id);
            return Ok(loan);
        }

        [HttpPost]
        public async Task<ActionResult<LoanResponseDto>> LoanBook([FromBody] LoanBookDto loanBookDto)
        {
            var createdLoan = await _loanService.LoanBookAsync(loanBookDto);
            return CreatedAtAction(nameof(GetLoanById), new { id = createdLoan.Id}, createdLoan);
        }

        [HttpPut("/api/loans/return/{loanId}")]
        public async Task<ActionResult<LoanResponseDto>> ReturnBook([FromRoute] int loanId)
        {
            var returned = await _loanService.ReturnBookAsync(loanId);
            return Ok(returned);
        }
    }
}
