using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApplicationAPI.Models.Dto
{
    public class TodoDto
    {
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
        [RegularExpression("^(High|Medium|Low)$", ErrorMessage = "Priority must be one of: High, Medium, Low.")]
        public string Priority { get; set; }

        [Required]
        [RegularExpression("^(Work|Personal)$", ErrorMessage = "Category must be either: Work, Personal.")]
        public string Category { get; set; }

        [Required]
        [FutureDate]
        public DateTime Deadline { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
