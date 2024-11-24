using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApplicationAPI.Models
{
    public class FutureDateAttribute : ValidationAttribute
    {
        public FutureDateAttribute() : base("The deadline must be a future date.")
        {
        }

        public override bool IsValid(object value)
        {
            if (value is DateTime deadline)
            {
                return deadline > DateTime.Now;
            }
            return false;
        }
    }
}
