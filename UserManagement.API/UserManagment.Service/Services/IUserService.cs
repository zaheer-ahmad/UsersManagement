using UserManagement.Service.Models;
using UserManagment.Service.Models;

namespace UserManagment.Service.Services
{
    public interface IUserService
    {
        Task<UsersResponseModel> GetUsers(PaginationRequestModel model);
        Task<(int, string)> UpdateUser(UserModel model);
        Task<(int, string)> DeleteUser(string id);
        Task<(int, string)> CreateUser(RegistrationModel model);
        Task<(int, string, UserModel)> GetUser(string id);
        Task<(int, string)> AddFirst();
    }
}
