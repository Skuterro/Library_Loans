using Backend.Models.Requests.BookRequests;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<BookResponseDto>> GetBookById([FromRoute] int id)
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

        [HttpPost("{id}/loan")]
        public async Task<ActionResult<BookResponseDto>> LoanBook([FromRoute] int id, [FromBody] LoanBookDto loanBookDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var loanedBook = await _bookService.LoanBookAsync(id, loanBookDto);
            return Ok(loanedBook);
        }

        [HttpPost("{id}/return")]
        public async Task<ActionResult<BookResponseDto>> ReturnBook([FromRoute] int id)
        {
            var returnedBook = await _bookService.ReturnBookAsync(id);
            return Ok(returnedBook);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BookResponseDto>> UpdateBook([FromRoute] int id, [FromBody] BookUpdateDto updateDto)
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
