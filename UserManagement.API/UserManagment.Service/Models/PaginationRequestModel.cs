namespace UserManagment.Service.Models
{
    public class PaginationRequestModel
    {
        public PaginationRequestModel()
        {
                
        }
        public PaginationRequestModel(int skip, int pagesize, string sortby, string sortdirection, string searchValue, int draw)
        {
            Skip = skip;
            PageSize = pagesize;
            SortBy = sortby;
            SortDirection = sortdirection;
            SearchValue = searchValue;
            Draw = draw;
        }
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public string? SortBy { get; set; }
        public string? SortDirection { get; set; }
        public string? SearchValue { get; set; }
        public int Draw { get; set; }
    }

}
