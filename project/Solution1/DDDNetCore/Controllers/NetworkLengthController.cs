using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DDDSample1.Domain.Users;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworkLengthController : ControllerBase
    {
        private readonly IUserService _service;
        
        public NetworkLengthController(IUserService service)
        {
            _service = service;
        }
        
        // GET: api/NetworkLength
        [HttpGet]
        public async Task<ActionResult<int>> GetNetworkLength()
        {
            return await _service.NetworkLength();
        }
    }
}