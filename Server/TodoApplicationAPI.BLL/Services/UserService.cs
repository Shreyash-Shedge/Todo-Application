using Microsoft.AspNetCore.Identity;
using TodoApplicationAPI.BLL.Interfaces;
using TodoApplicationAPI.Exceptions;
using TodoApplicationAPI.Models;
using TodoApplicationAPI.Models.Dto;
using System.Threading.Tasks;

namespace TodoApplicationAPI.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository userRepository, PasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
        }

        public async Task RegisterUserAsync(UserDto userDto)
        {
            var existingUserByUsername = await _userRepository.GetUserByUsernameAsync(userDto.Username);
            var existingUserByEmail = await _userRepository.GetUserByEmailAsync(userDto.Email);

            if (existingUserByUsername != null || existingUserByEmail != null)
            {
                throw new UserAlreadyExistsException("A user with this email or username already exists.");
            }

            var user = new User
            {
                Username = userDto.Username,
                Email = userDto.Email,
                PasswordHash = _passwordHasher.HashPassword(null, userDto.Password)
            };

            await _userRepository.CreateUserAsync(user);
        }

        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                throw new UserNotFoundException("Invalid email or password.");
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            if (result != PasswordVerificationResult.Success)
            {
                throw new UserNotFoundException("Invalid email or password.");
            }

            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUserAsync(id);
        }
    }
}
