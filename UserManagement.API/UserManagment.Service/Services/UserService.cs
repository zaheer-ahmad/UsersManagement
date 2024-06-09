using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using UserManagement.Data.Models;
using UserManagement.Service.Models;
using UserManagment.Service.Models;
using System.Linq.Dynamic.Core;
using System.Data;

namespace UserManagment.Service.Services
{
    public class UserService:IUserService
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IStringLocalizer<SharedResources> _Localizer;
        public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IStringLocalizer<SharedResources> localizer)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            _Localizer = localizer;
        }
        public async Task<UsersResponseModel> GetUsers(PaginationRequestModel model)
        {
            var searchValue = model.SearchValue.ToLower();
            var userIqueryAble = userManager.Users.Where(x => x.IsActive && (string.IsNullOrEmpty(searchValue) || (x.Email != null && x.Email.ToLower().Contains(searchValue)) ||
            x.Name.ToLower().Contains(searchValue) || (x.UserName != null && x.UserName.ToLower().Contains(searchValue)))
            ).Select(x => new UserModel
            {
                Id = x.Id,
                Email = x.Email,
                Name = x.Name,
                Username = x.UserName,
            });
            if (!string.IsNullOrEmpty(model.SortBy) && !string.IsNullOrEmpty(model.SortDirection))
            {
                userIqueryAble = userIqueryAble.OrderBy(model.SortBy + " " + model.SortDirection);
            }
            var users = userIqueryAble.Skip(model.Skip).Take(model.PageSize).ToList();
            var userCount = userIqueryAble.Count();

            return new UsersResponseModel {
                Rows = users,
                Total = userCount
            };
        }
        public async Task<(int, string)> CreateUser(RegistrationModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return (0, _Localizer["User already exists"]);

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Name = model.Name,
                ActionUser = model.ActionUser
            };
            model.Password = AppConstant.DefaultPassword;//On real app a link sent to user via email to create password 
            var createUserResult = await userManager.CreateAsync(user, model.Password);
            if (!createUserResult.Succeeded)
                return (0, _Localizer["User creation failed! Please check user details and try again."]);

            if (!await roleManager.RoleExistsAsync(model.Role))
            {
                await roleManager.CreateAsync(new IdentityRole
                {
                    Name = model.Role,
                    NormalizedName = model.Role.ToUpper()
                });
            }
            var currentUser = await userManager.FindByNameAsync(model.Username);
            var roleresult = await userManager.AddToRoleAsync(currentUser, model.Role);

            return (1, _Localizer["User created successfully!"]);
        }
        public async Task<(int, string)> UpdateUser(UserModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user == null)
                return (0, _Localizer["User Not Found"]);

            user.Email = model.Email;
            user.Name = model.Name;
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                var role = await userManager.GetRolesAsync(user);
                if (role != null && role.First() != model.Role)
                {
                    var removeRolesResult = await userManager.RemoveFromRolesAsync(user, role);
                    if (!removeRolesResult.Succeeded)
                    {
                        return (0, "Error removing existing roles.");
                    }

                    var addRoleResult = await userManager.AddToRoleAsync(user, model.Role);
                    if (!addRoleResult.Succeeded)
                    {
                        return (0, "Error adding new role.");
                    }
                }
                return (1, _Localizer["User Updated successfully!"]);
            }
            return (1, _Localizer["An error occurred while updating the record."]);
        }
        public async Task<(int, string)> DeleteUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return (0, _Localizer["User Not Found"]);

            user.IsActive = false;
            var result = await userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return (1, _Localizer["User Deleted successfully!"]);
            }
            return (1, _Localizer["An error occurred while deleting the record."]);
        }

        public async Task<(int, string, UserModel)> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
                return (0, _Localizer["User Not Found"],null);

            var roleList = await userManager.GetRolesAsync(user);
            var userModel =  new UserModel { 
                Email = user.Email,
                Id = id,    
                Name = user.Name,
                Role  = roleList.FirstOrDefault(),
                Username = user.UserName
            };
            return (1, "User Fetched", userModel);
        }

        public async Task<(int, string)> AddFirst()
        {
            var model = new RegistrationModel()
            {
                ActionUser = "Danial.Kimao",
                Email = "danial.kimao@gmail.com",
                Name = "Danial Kimao",
                Password = "#F.5tcb1",
                Role = "Admin",
                Username = "Danial.Kimao"
            };
            var userExists = await userManager.FindByNameAsync(model.Username);
            if(userExists == null)
            {
                var (status, message) = await CreateUser(model);
                return (status, message);
            }
            return (0, _Localizer["User Already Exist"]);
        }
    }
}
