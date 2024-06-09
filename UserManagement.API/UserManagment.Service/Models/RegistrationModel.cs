using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Service.Models
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Name is required")]
        public string? Name { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        public string? Password { get; set; }
        [Required(ErrorMessage = "Action User is required")]
        public string ActionUser { get; set; }
        [Required(ErrorMessage = "User Role is required")]
        public string Role { get; set; }
    }
}
