using System.Threading.Tasks;
using System.Collections.Generic;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI.BLL.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByUsernameAsync(string username);
        Task CreateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }
}
