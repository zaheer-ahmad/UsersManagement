using UserManagement.Service.Models;

namespace UserManagment.Service.Models
{
    public class UsersResponseModel
    {
        public List<UserModel> Rows { get; set; }
        public int Total { get; set; }
    }
}
