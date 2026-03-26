using Microsoft.AspNetCore.Mvc;
using AuthBackend.Data;
using Microsoft.EntityFrameworkCore;

namespace AuthBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlarmController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AlarmController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("raw")]
        public async Task<IActionResult> GetRawAlarms()
        {
            var data = await _context.RawAlarms.ToListAsync();
            return Ok(data);
        }

        [HttpGet("configured")]
        public async Task<IActionResult> GetConfiguredAlarms()
        {
            var data = await _context.ConfiguredAlarms.ToListAsync();
            return Ok(data);
        }
    }
}