using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
using Backend.Services;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class ReadersController : ControllerBase
    {
        private readonly IReaderService _readerService;

        public ReadersController(IReaderService readerService)
        {
            _readerService = readerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReaderResponseDto>>> GetAllReaders()
        {
            var readers = await _readerService.GetAllReadersAsync();
            return Ok(readers);
        }

        [HttpGet("{id}/books")]
        public async Task<ActionResult<IEnumerable<SimpleBookResponseDto>>> GetReaderBooks([FromRoute] int id)
        {
            var books = await _readerService.GetReaderBooksAsync(id);
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReaderResponseDto>> GetReaderById([FromRoute] int id)
        {
            var clients = await _readerService.GetReaderByIdAsync(id);
            return Ok(clients);
        }

        [HttpPost]
        public async Task<ActionResult> CreateReader([FromBody] ReaderCreateDto clientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdClient = await _readerService.CreateReaderAsync(clientDto);
            return CreatedAtAction(nameof(GetReaderById), new { id = createdClient.Id }, createdClient);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ReaderResponseDto>> UpdateReader([FromRoute] int id,  [FromBody] ReaderUpdateDto clientDto)
        {
            if (!ModelState.IsValid)
            {  
                return BadRequest(ModelState); 
            }
            var updatedClient = await _readerService.UpdateReaderAsync(id, clientDto);
            return Ok(updatedClient);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReader([FromRoute] int id)
        {
            await _readerService.DeleteReaderAsync(id);
            return NoContent();
        }
    }
}
