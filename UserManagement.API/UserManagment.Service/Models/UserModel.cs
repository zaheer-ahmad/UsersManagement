﻿using System.ComponentModel.DataAnnotations;

namespace UserManagment.Service.Models
{
    public class UserModel
    {
        public string? Id { get; set; }
        public string? Username { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string Role { get; set; }

    }
}
