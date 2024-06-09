using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagment.Service.Models;

namespace UserManagement.Service.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required",ErrorMessageResourceName = "User Name is required",ErrorMessageResourceType =typeof(SharedResources))]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Password is required", ErrorMessageResourceName = "Password is required", ErrorMessageResourceType = typeof(SharedResources))]
        public string? Password { get; set; }
    }
}
