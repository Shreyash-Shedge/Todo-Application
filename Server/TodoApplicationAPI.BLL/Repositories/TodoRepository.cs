using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TodoApplicationAPI.BLL.Interfaces;
using TodoApplicationAPI.Data;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI.BLL.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Todo> GetTodosByUser(int userId)
        {
            return _context.Todos.Where(t => t.UserId == userId).ToList();
        }

        public Todo GetTodoById(int todoId)
        {
            return _context.Todos.FirstOrDefault(t => t.TodoId == todoId);
        }

        public void AddTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            _context.SaveChanges();
        }

        public void UpdateTodo(Todo todo)
        {
            _context.Todos.Update(todo);
            _context.SaveChanges();
        }

        public void DeleteTodo(int todoId)
        {
            var todo = _context.Todos.FirstOrDefault(t => t.TodoId == todoId);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
                _context.SaveChanges();
            }
        }
    }
}
