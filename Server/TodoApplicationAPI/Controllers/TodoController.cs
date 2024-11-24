using Microsoft.AspNetCore.Mvc;
using TodoApplicationAPI.Models;
using System;
using System.Collections.Generic;
using TodoApplicationAPI.BLL.Interfaces;
using TodoApplicationAPI.Models.Dto;

namespace TodoApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet("User/{userId}")]
        public ActionResult<List<Todo>> GetAllTodos(int userId)
        {
            var todos = _todoService.GetTodosByUser(userId);
            if (todos == null) return NotFound(new ApiResponse(false, "Todos not found"));
            return Ok(new ApiResponse(true, "Todos fetched successfully", todos));
        }

        [HttpPost("User/{userId}")]
        public ActionResult AddTodo(int userId, [FromBody] TodoDto todoDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var todo = new Todo
            {
                UserId = userId,
                Title = todoDto.Title,
                Description = todoDto.Description,
                Priority = todoDto.Priority,
                Category = todoDto.Category,
                Deadline = todoDto.Deadline,
                CreatedAt = DateTime.Now
            };
            _todoService.AddTodo(todo);

            return CreatedAtAction(nameof(GetAllTodos), new { userId = userId }, todo);
        }

        [HttpGet("{todoId}/User/{userId}")]
        public ActionResult<Todo> GetTodoById(int todoId, int userId)
        {
            var todo = _todoService.GetTodoById(todoId);
            if (todo == null || todo.UserId != userId) return NotFound(new ApiResponse(false, "Todo not found"));
            return Ok(new ApiResponse(true, "Todo fetched successfully", todo));
        }

        [HttpPut("{todoId}/User/{userId}")]
        public ActionResult UpdateTodo(int todoId, int userId, [FromBody] TodoDto todoDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var todo = _todoService.GetTodoById(todoId);
            if (todo == null || todo.UserId != userId) return NotFound(new ApiResponse(false, "Todo not found"));

            todo.Title = todoDto.Title;
            todo.Description = todoDto.Description;
            todo.Priority = todoDto.Priority;
            todo.Category = todoDto.Category;
            todo.Deadline = todoDto.Deadline;

            _todoService.UpdateTodo(todo);

            return NoContent();
        }

        [HttpDelete("{todoId}/User/{userId}")]
        public ActionResult DeleteTodo(int todoId, int userId)
        {
            var todo = _todoService.GetTodoById(todoId);
            if (todo == null || todo.UserId != userId) return NotFound(new ApiResponse(false, "Todo not found"));

            _todoService.DeleteTodo(todoId);

            return NoContent();
        }
    }
}
