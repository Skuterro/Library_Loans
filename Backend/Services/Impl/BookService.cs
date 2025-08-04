using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.BookRequests;
using Backend.Models.Requests.LoanRequests;
using Backend.Models.Responses.BookResponses;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class BookService : IBookService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public BookService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookResponseDto>> GetAllBooksAsync()
        {
            var books = await _context.Books
                                    .Include(b => b.Loans.Where(l => l.ReturnDate == null))
                                    .ThenInclude(l => l.Reader)
                                    .ToListAsync();
            return _mapper.Map<IEnumerable<BookResponseDto>>(books);
        }

        public async Task<IEnumerable<SimpleBookResponseDto>> GetAvailableBooksAsync()
        {
            var availableBooks = await _context.Books.Where(b => !b.Loans.Any(l => l.ReturnDate == null)).ToListAsync();
            return _mapper.Map<IEnumerable<SimpleBookResponseDto>>(availableBooks);
        }

        public async Task<SimpleBookResponseDto> GetBookByIdAsync(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);

            if(book == null)
            {
                throw new NotFoundException($"Book with ID {id} does not exist.");
            }

            return _mapper.Map<SimpleBookResponseDto>(book);
        }
        public async Task<SimpleBookResponseDto> CreateBookAsync(BookCreateDto bookDto)
        {
            bool titleExists = await _context.Books.AnyAsync(c => c.Title == bookDto.Title);
            if (titleExists)
            {
                throw new BadRequestException("This title is in database.");
            }

            var bookEntity = _mapper.Map<Book>(bookDto);
            _context.Books.Add(bookEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<SimpleBookResponseDto>(bookEntity);
        }


        public async Task<SimpleBookResponseDto> UpdateBookAsync(int id, BookUpdateDto updateDto)
        {
            var bookToUpdate = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
        
            if(bookToUpdate == null)
            {
                throw new NotFoundException($"Book with ID {id} does not exist.");
            }

            if (bookToUpdate.Title != updateDto.Title)
            {
                bool titleExists = await _context.Books.AnyAsync(c => c.Title == updateDto.Title);
                if (titleExists)
                {
                    throw new BadRequestException("This title is in database.");
                }
            }

            _mapper.Map(updateDto, bookToUpdate);
            await _context.SaveChangesAsync();
            return _mapper.Map<SimpleBookResponseDto>(bookToUpdate);
        }

        public async Task DeleteBookAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            
            if(book == null)
            {
                throw new NotFoundException($"Book with ID {id} does not exist.");
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }

        public Task<bool> BookExistsAsync(int id)
        {
            return _context.Books.AnyAsync(b => b.Id == id);
        }
    }
}
