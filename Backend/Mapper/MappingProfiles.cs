using AutoMapper;
using Backend.Models.Entities;
using Backend.Models.Requests.BookRequests;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;

namespace Backend.Mapper
{
    public class ClientMappingProfile : Profile
    {
        public ClientMappingProfile() 
        {
            CreateMap<ClientCreateDto, Client>();
            CreateMap<ClientUpdateDto, Client>();
            CreateMap<Client, ClientResponseDto>();
            CreateMap<Client, SimpleClientResponseDto>();
        }
    }

    public class BookMappingProfile : Profile
    {
        public BookMappingProfile()
        {
            CreateMap<BookCreateDto, Book>();
            CreateMap<BookUpdateDto, Book>();
            CreateMap<Book, BookResponseDto>()
                .ForMember(dest => dest.LoanedBy, opt => opt.MapFrom(src => src.Client));
            CreateMap<Book, SimpleBookResponseDto>();
        }
    }
}
