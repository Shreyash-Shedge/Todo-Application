using Microsoft.AspNetCore.Mvc;
using TodoApplicationAPI.BLL.Services;
using TodoApplicationAPI.Exceptions;
using TodoApplicationAPI.Models.Dto;
using TodoApplicationAPI.Models;

namespace TodoApplicationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(false, "Invalid data.", ModelState));
            }

            try
            {
                await _userService.RegisterUserAsync(userDto);
                return CreatedAtAction(nameof(Register), new { id = userDto.Username }, new ApiResponse(true, "User registered successfully.", userDto));
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(new ApiResponse(false, ex.Message));
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(false, "Invalid login data.", ModelState));
            }

            try
            {
                var user = await _userService.LoginAsync(userDto.Email, userDto.Password);

                var responseUser = new
                {
                    user.Id,
                    user.Username,
                    user.Email
                };

                return Ok(new ApiResponse(true, "Login successful.", responseUser));
            }
            catch (UserNotFoundException ex)
            {
                return Unauthorized(new ApiResponse(false, ex.Message));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return Ok(new ApiResponse(true, "User deleted successfully."));
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new ApiResponse(false, ex.Message));
            }
        }
    }
}
