using AutoMapper;
using Backend.Data;
using Backend.Exceptions;
using Backend.Models.Entities;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.ClientResponses;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Impl
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ClientService(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ClientResponseDto>> GetAllClientsAsync()
        {
            var clients = await _context.Clients.Include(c => c.LoanedBooks).ToListAsync();
            return _mapper.Map<IEnumerable<ClientResponseDto>>(clients);
        }

        public async Task<ClientResponseDto> GetClientByIdAsync(int id)
        {
            var client = await _context.Clients.Include(c => c.LoanedBooks).FirstOrDefaultAsync(a => a.Id == id);

            if (client == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            return _mapper.Map<ClientResponseDto>(client);
        }

        public async Task<ClientResponseDto> CreateClientAsync(ClientCreateDto clientDto)
        {
            bool emailExists = await _context.Clients.AnyAsync(c => c.Email == clientDto.Email);
            if (emailExists)
            {
                throw new BadRequestException("The email is already in use.");
            }

            var clientEntity = _mapper.Map<Client>(clientDto);

            _context.Clients.Add(clientEntity);

            await _context.SaveChangesAsync();

            return _mapper.Map<ClientResponseDto>(clientEntity);
        }

        public async Task<ClientResponseDto> UpdateClientAsync(int id, ClientUpdateDto updateDto)
        {
            var clientToUpdate = await _context.Clients.Include(c => c.LoanedBooks).FirstOrDefaultAsync(c => c.Id == id);

            if (clientToUpdate == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            if (clientToUpdate.Email != updateDto.Email)
            {
                bool emailExists = await _context.Clients.AnyAsync(c => c.Email == updateDto.Email);
                if (emailExists)
                {
                    throw new BadRequestException("This email is already in use.");
                }
            }

            _mapper.Map(updateDto, clientToUpdate);
            await _context.SaveChangesAsync();
            return _mapper.Map<ClientResponseDto>(clientToUpdate);
        }

        public async Task DeleteClientAsync(int id)
        {
            var clientToDelete = await _context.Clients.FindAsync(id);
            
            if(clientToDelete == null)
            {
                throw new NotFoundException($"Client with ID {id} does not exist.");
            }

            _context.Clients.Remove(clientToDelete);
            await _context.SaveChangesAsync();
        }


        public Task<bool> ClientExistsAsync(int id)
        {
            return _context.Clients.AnyAsync(c => c.Id == id);
        }


    }
}
