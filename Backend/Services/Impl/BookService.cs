using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.BookRequests;
using Backend.Models.Responses.BookResponses;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class BookService : IBookService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IClientService _clientService;

        public BookService(AppDbContext context, IMapper mapper, IClientService clientService)
        {
            _context = context;
            _mapper = mapper;
            _clientService = clientService;
        }

        public async Task<IEnumerable<BookResponseDto>> GetAllBooksAsync()
        {
            var books = await _context.Books.Include(b => b.Client).ToListAsync();
            return _mapper.Map<IEnumerable<BookResponseDto>>(books);
        }

        public async Task<BookResponseDto> GetBookByIdAsync(int id)
        {
            var book = await _context.Books.Include(b => b.Client).FirstOrDefaultAsync(b => b.Id == id);

            if(book == null)
            {
                throw new NotFoundException($"Book with ID {id} does not exist.");
            }

            return _mapper.Map<BookResponseDto>(book);
        }
        public async Task<BookResponseDto> CreateBookAsync(BookCreateDto bookDto)
        {
            bool titleExists = await _context.Books.AnyAsync(c => c.Title == bookDto.Title);
            if (titleExists)
            {
                throw new BadRequestException("This title is in database.");
            }

            var bookEntity = _mapper.Map<Book>(bookDto);
            _context.Books.Add(bookEntity);
            await _context.SaveChangesAsync();
            return _mapper.Map<BookResponseDto>(bookEntity);
        }

        public async Task<BookResponseDto> LoanBookAsync(int id, LoanBookDto loadBookDto)
        {
            var bookToLoan = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);

            if(bookToLoan == null)
            {
                throw new NotFoundException($"Book with Id {id} does not exist.");
            }

            if(bookToLoan.ClientId != null)
            {
                throw new BadRequestException($"Book is already loaned.");
            }

            if(!await _clientService.ClientExistsAsync(loadBookDto.ClientId))
            {
                throw new BadRequestException($"Client with Id {loadBookDto.ClientId} does not exist.");
            }

            bookToLoan.ClientId = loadBookDto.ClientId;
            bookToLoan.LoanDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            await _context.Entry(bookToLoan).Reference(b => b.Client).LoadAsync();
            return _mapper.Map<BookResponseDto>(bookToLoan);
        }

        public async Task<BookResponseDto> ReturnBookAsync(int id)
        {
            var bookToReturn = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);

            if (bookToReturn == null)
            {
                throw new NotFoundException($"Book with Id {id} does not exist.");
            }

            if (bookToReturn.ClientId == null)
            {
                throw new BadRequestException($"Book with Id {id} is not loaned.");
            }

            bookToReturn.ClientId = null;
            bookToReturn.LoanDate = null;
            await _context.SaveChangesAsync();
            return _mapper.Map<BookResponseDto>(bookToReturn);
        }

        public async Task<BookResponseDto> UpdateBookAsync(int id, BookUpdateDto updateDto)
        {
            var bookToUpdate = await _context.Books.Include(b => b.Client).FirstOrDefaultAsync(b => b.Id == id);
        
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
            return _mapper.Map<BookResponseDto>(bookToUpdate);
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
    }
}
