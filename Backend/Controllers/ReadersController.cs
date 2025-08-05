using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Requests.QueryParams;
using Backend.Models.Responses;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
using Backend.Services;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/readers")]
    public class ReadersController : ControllerBase
    {
        private readonly IReaderService _readerService;

        public ReadersController(IReaderService readerService)
        {
            _readerService = readerService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<ReaderResponseDto>>> GetAllReaders([FromQuery] ReaderQueryParameters query)
        {
            var readers = await _readerService.GetAllReadersAsync(query);
            return Ok(readers);
        }

        [HttpGet("{id}/loans")]
        public async Task<ActionResult<IEnumerable<SimpleBookResponseDto>>> GetReaderLoans([FromRoute] int id)
        {
            var loans = await _readerService.GetReaderLoansAsync(id);
            return Ok(loans);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<ReaderResponseDto>> GetReaderById([FromRoute] int id)
        {
            var readers = await _readerService.GetReaderByIdAsync(id);
            return Ok(readers);
        }

        [HttpPost]
        public async Task<ActionResult> CreateReader([FromBody] ReaderCreateDto readerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdReader = await _readerService.CreateReaderAsync(readerDto);
            return CreatedAtAction(nameof(GetReaderById), new { id = createdReader.Id }, createdReader);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ReaderResponseDto>> UpdateReader([FromRoute] int id,  [FromBody] ReaderUpdateDto readerDto)
        {
            if (!ModelState.IsValid)
            {  
                return BadRequest(ModelState); 
            }
            var updatedReader = await _readerService.UpdateReaderAsync(id, readerDto);
            return Ok(updatedReader);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteReader([FromRoute] int id)
        {
            await _readerService.DeleteReaderAsync(id);
            return NoContent();
        }
    }
}
