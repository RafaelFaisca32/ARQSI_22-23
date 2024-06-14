using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultSafestPath : ControllerBase
    {
        private readonly IUserService _service;

        public ConsultSafestPath(IUserService service) => _service = service;

        // Put: api/ConsultSafestPath/idOrig/idDest
        [HttpPut("{idOrig}/{idDest}")]
        public async Task<ActionResult<UserDto>> SafestPath(string idOrig, string idDest)
        {
            var usOrig = await _service.GetByIdAsync(new UserId(idOrig));
            var usDest = await _service.GetByIdAsync(new UserId(idDest));
            if (usOrig == null || usDest == null)
            {
                return NotFound();
            }
/*
            try
            {
                var us1 = await _service.ChangeMood(us, newState);
                if (us1 == null)
                {
                    return NotFound();
                }

                return Ok(us1);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new {ex.Message});
            }*/
            return Ok(usOrig);
        }
    }
}