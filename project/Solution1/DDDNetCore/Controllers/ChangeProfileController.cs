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
    public class ChangeProfileController : ControllerBase
    {
        private readonly IUserService _service;

        public ChangeProfileController(IUserService service) => _service = service;


        // Put: api/ChangeProfile/id
        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> ChangeUserProfile(string id, UserDto updatedUser)
        {
            if (id != updatedUser.Id.ToString())
            {
                return BadRequest();
            }

            var us = await _service.GetByIdAsync(new UserId(id));

            if (us == null)
            {
                return NotFound();
            }

            try
            {
                var us1 = await _service.ChangeUserProfile(updatedUser);
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