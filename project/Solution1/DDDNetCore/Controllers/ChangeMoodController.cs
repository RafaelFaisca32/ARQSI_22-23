using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Users;
using DDDSample1.Domain.ValueObjects;
using Microsoft.AspNetCore.Mvc;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChangeMoodController : ControllerBase
    {
        private readonly IUserService _service;

        public ChangeMoodController(IUserService service) => _service = service;


        // Put: api/ChangeMood/id/novoestado
        [HttpPut("{id}/{newState}")]
        public async Task<ActionResult<UserDto>> ChangeHumorState(string id, string newState)
        {
            var us = await _service.GetByIdAsync(new UserId(id));

            if (us == null)
            {
                return NotFound();
            }

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
            }
        }
    }
}