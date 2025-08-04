using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.LoanRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.LoanResponses;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class LoanService : ILoanService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IReaderService _readerService;
        private readonly IBookService _bookService;

        public LoanService(AppDbContext context, IMapper mapper, IBookService bookService, IReaderService readerService)
        {
            _context = context;
            _mapper = mapper;
            _bookService = bookService;
            _readerService = readerService;
        }

        public async Task<IEnumerable<LoanResponseDto>> GetAllLoansAsync()
        {
            var loans = await _context.Loans
                                        .Include(l => l.Reader)
                                        .Include(l => l.Book)
                                        .ToListAsync();
            return _mapper.Map<IEnumerable<LoanResponseDto>>(loans);
        }

        public async Task<LoanResponseDto> GetLoanByIdAsync(int id)
        {
            var loan = await _context.Loans
                                    .Include(l => l.Reader)
                                    .Include(l => l.Book)
                                    .FirstOrDefaultAsync(l => l.Id == id);

            if (loan == null)
            {
                throw new NotFoundException($"Loan with ID {id} does not exist.");
            }

            return _mapper.Map<LoanResponseDto>(loan);
        }

        public async Task<LoanResponseDto> LoanBookAsync(LoanBookDto loanBookDto)
        {
            if (!await _bookService.BookExistsAsync(loanBookDto.bookId))
            {
                throw new NotFoundException($"Book with Id {loanBookDto.bookId} does not exist.");
            }
            if (!await _readerService.ReaderExistsAsync(loanBookDto.readerId))
            {
                throw new NotFoundException($"Client with Id {loanBookDto.readerId} does not exist.");
            }
            if(await IsBookLoanedAsync(loanBookDto.bookId))
            {
                throw new BadRequestException($"Book is already loaned.");
            }

            var newLoan = new Loan
            {
                BookId = loanBookDto.bookId,
                ReaderId = loanBookDto.readerId,
                LoanDate = DateTime.UtcNow
            };

            _context.Loans.Add(newLoan);
            await _context.SaveChangesAsync();
            return _mapper.Map<LoanResponseDto>(newLoan);
        }

        public async Task<LoanResponseDto> ReturnBookAsync(int loanId)
        {
            var loan = await _context.Loans
                                     .Include(l => l.Book)
                                     .Include(l => l.Reader)
                                     .FirstOrDefaultAsync(l => l.Id == loanId);

            if(loan == null)
            {
                throw new NotFoundException($"Loan with Id {loanId} does not exist.");
            }
            if(loan.ReturnDate != null)
            {
                throw new BadRequestException($"Book from loan {loanId} has already been returned.");
            }

            loan.ReturnDate = DateTime.UtcNow;
            _context.Loans.Update(loan);
            await _context.SaveChangesAsync();

            return _mapper.Map<LoanResponseDto>(loan);
        }

        public async Task<bool> IsBookLoanedAsync(int bookId)
        {
            return await _context.Loans.AnyAsync(l => l.BookId == bookId && l.ReturnDate == null);
        }
    }
}
