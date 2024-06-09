using UserManagement.Service.Models;

namespace UserManagment.Service.Services
{
    public interface IAuthService
    {
        Task<(int, string)> Login(LoginModel model);
    }
}
