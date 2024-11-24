using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI.BLL.Interfaces
{
    public interface ITodoService
    {
        List<Todo> GetTodosByUser(int userId);
        Todo GetTodoById(int todoId);
        void AddTodo(Todo todo);
        void UpdateTodo(Todo todo);
        void DeleteTodo(int todoId);
    }
}
