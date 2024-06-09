using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Data.Models
{
    public class AuditLog
    {
        public int AuditLogId { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(256)]
        public string UserName { get; set; }
        [MaxLength(256)]
        public string Email { get; set; }
        [MaxLength(50)]
        public string AuditLogType { get; set; }
        [MaxLength(450)]
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        
    }
}
