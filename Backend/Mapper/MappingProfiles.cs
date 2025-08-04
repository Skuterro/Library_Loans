using AutoMapper;
using Backend.Models.Entities;
using Backend.Models.Requests.BookRequests;
using Backend.Models.Requests.ClientRequests;
using Backend.Models.Responses.BookResponses;
using Backend.Models.Responses.ClientResponses;
using Backend.Models.Responses.LoanResponses;

namespace Backend.Mapper
{
    public class ReaderMappingProfile : Profile
    {
        public ReaderMappingProfile() 
        {
            CreateMap<ReaderCreateDto, Reader>();
            CreateMap<ReaderUpdateDto, Reader>();
            CreateMap<Reader, ReaderResponseDto>();
            CreateMap<Reader, SimpleReaderResponseDto>();
        }
    }

    public class LoanMappingProfile : Profile
    {
        public LoanMappingProfile()
        {
            CreateMap<Loan, LoanResponseDto>()
                .ForMember(dest => dest.LoanedBy, opt => opt.MapFrom(src => src.Reader));
        }
    }

    public class BookMappingProfile : Profile
    {
        public BookMappingProfile()
        {
            CreateMap<BookCreateDto, Book>();
            CreateMap<BookUpdateDto, Book>();
            CreateMap<Book, BookResponseDto>()
                .ForMember(dest => dest.LoanedBy, opt => opt.MapFrom(src => src.Loans.FirstOrDefault().Reader))
                .ForMember(dest => dest.LoanDate, opt => opt.MapFrom(src => src.Loans.FirstOrDefault().LoanDate));
            CreateMap<Book, SimpleBookResponseDto>();
        }
    }
}
