using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplicationAPI.BLL.Interfaces;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI.BLL.Services
{
    public class TodoService : ITodoService
    {
        private readonly ITodoRepository _todoRepository;

        public TodoService(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public List<Todo> GetTodosByUser(int userId)
        {
            return _todoRepository.GetTodosByUser(userId);
        }

        public Todo GetTodoById(int todoId)
        {
            return _todoRepository.GetTodoById(todoId);
        }

        public void AddTodo(Todo todo)
        {
            _todoRepository.AddTodo(todo);
        }

        public void UpdateTodo(Todo todo)
        {
            _todoRepository.UpdateTodo(todo);
        }

        public void DeleteTodo(int todoId)
        {
            _todoRepository.DeleteTodo(todoId);
        }
    }
}
