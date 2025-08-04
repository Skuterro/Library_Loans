using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
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

        public async Task<IEnumerable<ReaderResponseDto>> GetAllReadersAsync()
        {
            var readers = await _context.Readers.ToListAsync();
            return _mapper.Map<IEnumerable<ReaderResponseDto>>(readers);
        }

        public async Task<IEnumerable<SimpleBookResponseDto>> GetReaderBooksAsync(int id)
        {
            var reader = await _context.Readers
                                        .Include(r => r.Loans.Where(l => l.ReturnDate == null))
                                        .ThenInclude(l => l.Book)
                                        .FirstOrDefaultAsync(r => r.Id == id);

            if (reader == null)
            {
                throw new NotFoundException($"Reader with ID {id} not found.");
            }

            var loanedBooks = reader.Loans.Select(l => l.Book).ToList();

            return _mapper.Map<IEnumerable<SimpleBookResponseDto>>(loanedBooks);
        }

        public async Task<ReaderResponseDto> GetReaderByIdAsync(int id)
        {
            var reader = await _context.Readers.FirstOrDefaultAsync(a => a.Id == id);

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
            var readerToDelete = await _context.Readers.FindAsync(id);
            
            if(readerToDelete == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            _context.Readers.Remove(readerToDelete);
            await _context.SaveChangesAsync();
        }


        public Task<bool> ReaderExistsAsync(int id)
        {
            return _context.Readers.AnyAsync(c => c.Id == id);
        }
    }
}
