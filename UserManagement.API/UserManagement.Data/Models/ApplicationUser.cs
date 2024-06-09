using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Data.Models
{
    public class ApplicationUser:IdentityUser
    {
        [MaxLength(50)]
        public string Name { get; set; }
        public bool IsActive { get; set; } = true;
        [MaxLength(256)]
        public string ActionUser { get; set; }
    }
}
