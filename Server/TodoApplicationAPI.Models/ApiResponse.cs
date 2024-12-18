﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApplicationAPI.Models
{
    public class ApiResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

        public ApiResponse(bool success, string message, object data = null)
        {
            Success = success;
            Message = message;
            Data = data;
        }
    }

}
