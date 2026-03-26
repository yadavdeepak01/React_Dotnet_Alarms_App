using Microsoft.AspNetCore.Mvc;
using AuthBackend.Data;
using AuthBackend.DTOs;
using System.Linq;

namespace AuthBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.LoginUsers
                .FirstOrDefault(u => u.Username == request.Username);

            if (user == null)
                return Unauthorized("Invalid username");

            // NOTE: Replace plain comparison with hashing later
            if (user.PasswordHash != request.Password)
                return Unauthorized("Invalid password");

            return Ok(new { message = "Login successful" });
        }
    }
}