using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplicationAPI.Models.Dto;

namespace TodoApplicationAPI.Models
{
    public class Todo
    {
        [Key]
        public int TodoId { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Title can't be longer than 100 characters.")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters long.")]
        [RegularExpression("^[a-zA-Z ]+$", ErrorMessage = "Title can only contain alphabetic characters.")]
        public string Title { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "Description can't be longer than 500 characters.")]
        [MinLength(3, ErrorMessage = "Description must be at least 3 characters long.")]
        [RegularExpression("^[a-zA-Z ]+$", ErrorMessage = "Description can only contain alphabetic characters.")]
        public string Description { get; set; }

        [Required]
        public string Priority { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        [FutureDate]
        public DateTime Deadline { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public bool IsCompleted { get; set; }

        public virtual User User { get; set; }
    }
}
