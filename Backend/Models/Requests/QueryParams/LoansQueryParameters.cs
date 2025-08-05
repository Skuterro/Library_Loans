namespace Backend.Models.Requests.QueryParams
{
    public class LoansQueryParameters : QueryParameters
    {
        public string? ReaderEmail { get; set; }
        public string? BookTitle { get; set; }
    }
}
