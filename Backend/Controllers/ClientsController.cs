using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.ClientResponses;
using Backend.Services;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientsController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientResponseDto>>> GetAllClients()
        {
            var clients = await _clientService.GetAllClientsAsync();
            return Ok(clients);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientResponseDto>> GetClientById([FromRoute] int id)
        {
            var clients = await _clientService.GetClientByIdAsync(id);
            return Ok(clients);
        }

        [HttpPost]
        public async Task<ActionResult> Createclient([FromBody] ClientCreateDto clientDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdClient = await _clientService.CreateClientAsync(clientDto);
            return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id }, createdClient);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ClientResponseDto>> UpdateClient([FromRoute] int id,  [FromBody] ClientUpdateDto clientDto)
        {
            if (!ModelState.IsValid)
            {  
                return BadRequest(ModelState); 
            }
            var updatedClient = await _clientService.UpdateClientAsync(id, clientDto);
            return Ok(updatedClient);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient([FromRoute] int id)
        {
            await _clientService.DeleteClientAsync(id);
            return NoContent();
        }
    }
}
