using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
using Backend.Models.Responses.LoanResponses;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class ReaderService : IReaderService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ReaderService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PagedResult<ReaderResponseDto>> GetAllReadersAsync(ReaderQueryParameters query)
        {
            var baseQuery = _context.Readers.Where(r => r.IsArchieved == false).AsQueryable();

            if (!string.IsNullOrEmpty(query.Email))
            {
                baseQuery = baseQuery.Where(c => EF.Functions.Like(c.Email, $"%{query.Email}%"));
            }

            var totalItemsCount = await baseQuery.CountAsync();

            var readers = await baseQuery
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize)
                .ToListAsync();

            var readersDto = _mapper.Map<List<ReaderResponseDto>>(readers);
            var pagedResult = new PagedResult<ReaderResponseDto>(readersDto, totalItemsCount, query.PageNumber, query.PageSize);

            return pagedResult;
        }

        public async Task<IEnumerable<LoanResponseDto>> GetReaderLoansAsync(int id)
        {
            var activeLoans = await _context.Loans
                                             .Where(l => l.ReaderId == id && l.ReturnDate == null)
                                             .Include(l => l.Book)
                                             .ToListAsync();
            return _mapper.Map<IEnumerable<LoanResponseDto>>(activeLoans);
        }

        public async Task<ReaderResponseDto> GetReaderByIdAsync(int id)
        {
            var reader = await _context.Readers.Where(r => r.IsArchieved == false).FirstOrDefaultAsync(r => r.Id == id);

            if (reader == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            return _mapper.Map<ReaderResponseDto>(reader);
        }

        public async Task<ReaderResponseDto> CreateReaderAsync(ReaderCreateDto readerDto)
        {
            bool emailExists = await _context.Readers.AnyAsync(c => c.Email == readerDto.Email);
            if (emailExists)
            {
                throw new BadRequestException("This email is already in use.");
            }

            var readerEntity = _mapper.Map<Reader>(readerDto);

            _context.Readers.Add(readerEntity);

            await _context.SaveChangesAsync();

            return _mapper.Map<ReaderResponseDto>(readerEntity);
        }

        public async Task<ReaderResponseDto> UpdateReaderAsync(int id, ReaderUpdateDto updateDto)
        {
            var readerToUpdate = await _context.Readers.FirstOrDefaultAsync(c => c.Id == id);

            if (readerToUpdate == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            if (readerToUpdate.IsArchieved)
            {
                throw new BadRequestException("This reader is archieved.");
            }

            if (readerToUpdate.Email != updateDto.Email)
            {
                bool emailExists = await _context.Readers.AnyAsync(c => c.Email == updateDto.Email);
                if (emailExists)
                {
                    throw new BadRequestException("This email is already in use.");
                }
            }

            _mapper.Map(updateDto, readerToUpdate);
            await _context.SaveChangesAsync();
            return _mapper.Map<ReaderResponseDto>(readerToUpdate);
        }

        public async Task DeleteReaderAsync(int id)
        {
            var readerToDelete = await _context.Readers.Include(r => r.Loans).FirstOrDefaultAsync(r => r.Id == id);
            
            if(readerToDelete == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            if (readerToDelete.Loans.Any(l => l.ReturnDate == null))
            {
                throw new BadRequestException("Cannot delete a reader with active loans.");
            }

            if (readerToDelete.Loans.Any())
            {
                readerToDelete.IsArchieved = true;
            }
            else
            {
                _context.Readers.Remove(readerToDelete);
            }

            await _context.SaveChangesAsync();
        }


        public Task<bool> ReaderExistsAsync(int id)
        {
            return _context.Readers.AnyAsync(c => c.Id == id);
        }

    }
}
