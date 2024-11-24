using System.Threading.Tasks;
using TodoApplicationAPI.Models;
using TodoApplicationAPI.Models.Dto;

namespace TodoApplicationAPI.BLL.Interfaces
{
    public interface IUserService
    {
        Task RegisterUserAsync(UserDto userDto);
        Task<User> LoginAsync(string email, string password);
        Task DeleteUserAsync(int id);
    }
}
