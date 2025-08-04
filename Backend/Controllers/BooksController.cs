using Backend.Models.Requests.BookRequests;
using Backend.Models.Requests.LoanRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookResponseDto>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("/AvailableBooks")]
        public async Task<ActionResult<BookResponseDto>> GetAvailableBooks()
        {
            var books = await _bookService.GetAvailableBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SimpleBookResponseDto>> GetBookById([FromRoute] int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<BookResponseDto>> CreateBook([FromBody] BookCreateDto bookDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdBook = await _bookService.CreateBookAsync(bookDto);
            return CreatedAtAction(nameof(GetBookById), new { id = createdBook.Id }, createdBook);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<SimpleBookResponseDto>> UpdateBook([FromRoute] int id, [FromBody] BookUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedBook = await _bookService.UpdateBookAsync(id, updateDto);
            return Ok(updatedBook);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook([FromRoute] int id)
        {
            await _bookService.DeleteBookAsync(id);
            return NoContent();
        }
    }
}
