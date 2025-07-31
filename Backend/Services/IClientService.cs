using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.ClientResponses;

namespace Backend.Services
{
    public interface IClientService
    {
        Task<IEnumerable<ClientResponseDto>> GetAllClientsAsync();
        Task<ClientResponseDto> GetClientByIdAsync(int id);
        Task<ClientResponseDto> CreateClientAsync(ClientCreateDto clientDto);
        Task<ClientResponseDto> UpdateClientAsync(int id, ClientUpdateDto updateDto);
        Task DeleteClientAsync(int id);
        Task<bool> ClientExistsAsync(int id);
    }
}
