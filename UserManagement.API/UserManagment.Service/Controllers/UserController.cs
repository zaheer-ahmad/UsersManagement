using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Service.Models;
using UserManagment.Service.Models;
using UserManagment.Service.Services;

namespace UserManagment.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;   
        public UserController(IUserService userService,ILogger<UserController> logger)
        {
           _userService = userService;
            _logger = logger;
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers([FromBody]PaginationRequestModel param)
        {
            try
            {
                //var model = DatatableHelper.GetDataTableModal(Request);
                var users = await _userService.GetUsers(param);
                var jsonData = new { draw = param.Draw, recordsFiltered = users.Total, recordsTotal = users.Total, data = users.Rows };
                return Ok(jsonData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CreateUser")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> CreateUser(RegistrationModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid payload");
                var (status, message) = await _userService.CreateUser(model);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return CreatedAtAction(nameof(CreateUser), model);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("GetUser/{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> GetUser(string id)
        {
            try
            {
                var (status, message,user) = await _userService.GetUser(id);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("UpdateUser")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> UpdateUser([FromBody]UserModel model)
        {
            try
            {
                var (status, message) = await _userService.UpdateUser(model);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return Ok(new { message = message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("DeleteUser/{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteUser(string id)
        {
            try
            {
                var (status, message) = await _userService.DeleteUser(id);
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return Ok(new { message = message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("AddFirstUser")]
        [AllowAnonymous]
        public async Task<IActionResult> AddFirstUser()
        {
            try
            {
                var (status, message) = await _userService.AddFirst();
                if (status == 0)
                {
                    return BadRequest(message);
                }
                return Ok(new { message = message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
